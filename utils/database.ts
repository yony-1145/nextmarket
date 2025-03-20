import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://hiro6155gh:6y2ah15ghmon@cluster0.1n1fy.mongodb.net/appDataBase?retryWrites=true&w=majority&appName=Cluster0")
    }catch(err){
        throw new Error()
    }
}

export default connectDB