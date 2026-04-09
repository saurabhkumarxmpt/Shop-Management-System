const express=require('express');
const router=express.Router();


const {createProduct}=require('../controller/productController');
const upload=require('../middlewares/upload');

router.post('/add-product',upload.single("image"),createProduct);

module.exports=router;