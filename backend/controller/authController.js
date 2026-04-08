const User=require("../models/users");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.register=async(req,res)=>{
    try{
        const{name,email,password,shopName,phone}=req.body;

        // Basic validation
        if(!name || !email || !password || !shopName || !phone){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        // Check if user already exists
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            });
        }

        // hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            shopName,
            phone
        });

        //send message
        res.status(201).json({
            success:true,
            message:'User registered successfully',
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                shopName: user.shopName,
                phone: user.phone
            }
        });
    }catch(err){
            res.status(500).json({message:'something went wrong'});
            console.error(err.message);
    }
}

exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;

        //Basic validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            });
        }

        //Check if user already exists
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                sucess:false,
                message:'email or user not found'
            });
        }

        //Check the password
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"password not matched"
            });
        }


        //ganrate the token
        const token=jwt.sign(
            {id:user._id},
            process.env.SECRET_KEY,
            {expiresIn: "7d"}
        );


        //send message
        res.status(200).json({
            success:true,
            message:'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                shopName: user.shopName
            }
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
}