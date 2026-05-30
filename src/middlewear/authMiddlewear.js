import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js'; // FIX: Capital 'U'

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user",
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized user",
            });
        }
        
        const user = await UserModel.findById(decode.id);
        req.user = user;
        next();
        
    } catch (error) {
        console.error("Middleware Error:", error); 
        return res.status(500).json({
            message: "Error in middleware"
        });
    }
}

export default authMiddleware;