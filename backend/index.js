require('dotenv').config();

const express=require("express");
const PORT=5001;
const database=require('./config/db');

const app=express();

app.use(express.json());
database();

app.get("/",(req,res)=>{
    return res.json({message:'this is the home page'});
});

app.listen(PORT,(err)=>{
    if(err){
        console.error("somthing is wrong",err);
    }else{
        console.info(`The server liston on port ${PORT}`);
    }
});


