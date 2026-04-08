const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["owner","staff"],
        default:"owner"
    },
    shopName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    }
},{timestamps:true});

const User=mongoose.model("users",userSchema);

module.exports=User;