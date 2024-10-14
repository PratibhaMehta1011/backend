import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item 
const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category : req.body.category ,
        image:image_filename,
    })

    try{
        await food.save();
        res.json({success:true , message:"Food Added"});
    }
    catch(err){
        console.log(err);
        res.json({success:false , message : "err"});
    }
};

// all food list 
const listFood = async(req,res)=>{
    try{
        const food = await foodModel.find({});
        res.json({success:true , data : food});
    }
    catch(err){
        res.json({success:false , message : "err"});
    }
}

// delete food item
const deletefood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}` ,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message : "Food deleted"});
    }
    catch(err){
        console.log(err);
        res.json({success:false , message : "err"});
    }
}
export {addFood , listFood , deletefood}