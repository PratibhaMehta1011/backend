import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 4000 ;

// middleware 
app.use(express.json());
app.use(cors()) ; //access backend from frontend

// db connection 
connectDB();

// api endpoints
app.use("/api/food" , foodRouter);
app.use("/images" , express.static("uploads"));
app.use("/api/user" , userRouter);
app.use("/ap/cart" , cartRouter);
app.use("/api/order" , orderRouter);

app.get("/" , (req,res)=>{
    res.send("Hello from backend");
});

app.listen(port,()=>{
    console.log("server is running on port 4000");
});