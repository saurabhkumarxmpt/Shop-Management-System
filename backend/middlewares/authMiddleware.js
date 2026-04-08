const jwt=require('jsonwebtoken');
const User=require("../models/users");

exports.protect=async(req,res,next)=>{
    try{
        let token;

        if(
            req.headers.authorization &&
            req.headers.authorization.startWith('Bearer')
        ){
            token=req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing"
            });
        }

        const decoded=jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
         });
    }
};