import mongoose from 'mongoose'

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongodb");
    } catch (error) {
        console.error("Error in connecting Mongodb",error)
    }
}

export default connectDb;