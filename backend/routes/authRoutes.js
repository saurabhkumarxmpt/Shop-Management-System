const express=require("express");

const protect=require('../middlewares/authMiddleware');
const {register,login}=require('../controller/authController');

const router=express.Router();

router.post('/register',register);
router.post('/login',protect,login);

module.exports=router;