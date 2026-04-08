require('dotenv').config();

const express=require("mongoose");
const PORT=process.env.PORT;

const app=express();

app.use(express.json());


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


