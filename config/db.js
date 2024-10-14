import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://Pratibha:<Pratibha>@cluster0.2smjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}
connectDB().then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));