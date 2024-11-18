import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://mehtapratibha540:OAcH4tf0zCtoxCfx@cluster0.oldaf.mongodb.net/");
}
connectDB().then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
