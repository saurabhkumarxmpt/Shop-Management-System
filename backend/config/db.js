const mongoose=require('mongoose');

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.info("database connect");
    }catch(err){
        console.error(err.message);
    }
}

module.exports=connectDb;