import { UserModel } from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        let { name, password, email, mobile } = req.body;
        console.log(req.body);

        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        let isExisted = await UserModel.findOne({ email });

        if (isExisted) return res.status(409).json({ message: "Email already registered" });

        let newUser = await UserModel.create({ name, email, password, mobile });

        let token = newUser.generateJWT(); // call from user.model

        res.cookie("token", token, { httpOnly: true });

        return res.status(201).json({ message: "user registered successfully", user: newUser });
    } catch (error) {
    console.log(error);

    return res.status(500).json({
        message: error.message,
    });

    }
};

export const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        let isExisted = await UserModel.findOne({ email });

        if (!isExisted) return res.status(404).json({ message: "User not found" });

        let comparePass = isExisted.comparePassword(password);

        if (!comparePass) return res.status(401).json({ message: "Invalid Credentials" });

        let token = isExisted.generateJWT();

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({ message: "User loggedIn successfully", user: isExisted });
    } catch(error){
    console.error("Login Error:", error);

    return res.status(500).json({
        message: error.message
    });
}
};
