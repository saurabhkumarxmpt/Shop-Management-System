const express=require('express');

const router=express.Router();

const authRoutes=require('./authRoutes');
const productRouter=require('./productRoutes');

router.use('/auth',authRoutes);
router.use('/product',productRouter);

module.exports=router;