import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login
const loginUser = async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user) return res.json({success:false , message:"User not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"});
        }

        const token = createToken(user._id);
        res.json({success:true,token});
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}

// create token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY);
}

// register
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try{
        // check user exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false , message:"User already Exists"});
        }
        // validate email for strong pass
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Please enter valid email"});
        }
        if(password.length<8){
            return res.json({success:false ,message:"Please enter a strong password" })
        }
        // hash pasword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        // create user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({success:true,token});

    }catch(err){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export  {loginUser,registerUser}