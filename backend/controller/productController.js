const Product=require('../models/products');

exports.createProduct=async(req,res)=>{
    try{
        const{
            name,
            description,
            price,
            costPrice,
            stockQuantity,
            category,
            brand,
            unit,
            minStockLevel,
            isActive
        }=req.body;

        if(!name || !price || !costPrice || !category){
            return res.status(400).json({
                success:false,
                message:"please fill all required fields"
            })
        }

        let imageUrl="";
        if(req.file){
            imageUrl=req.file.path;
        }

        const createProduct=await Product.create({
            name,
            description,
            price,
            costPrice,
            stockQuantity,
            category,
            brand,
            unit,
            minStockLevel,
            isActive,
            image:imageUrl
        });

        return res.status(201).json({
            success:true,
            message:'product created successfully',
            data:createProduct
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
}