const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:""
    },
    price:{
        type:Number,
        required:true
    },
    constPrice:{
        type:Number,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String
    },
    unit:{
        type:String,
        enum:["pcs","kg","liter"],
        default:"pcs"
    },
    minStockLevel:{
        type:Number,
        default:5
    },
    image:{
        type:String,
        default:true
    },
    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

const products=mongoose.model("products",productSchema);

module.exports=products;