const express = require('express');
const {registerController,loginController, testController, forgotPasswordController, updateProfileController} = require('../controller/authController');
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware');
const { updateProductController } = require('../controller/productController');


//router object
const router = express.Router()


//routing

//REGISTER || METHOD POST
router.post('/register',registerController);

//LOGIN || METHOD POST
router.post('/login',loginController);

//forgot password
router.post('/forgot-password',forgotPasswordController)
//test routes
router.get('/test',requireSignIn,isAdmin,testController)

//user proected route
router.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
})

//admin proected route
router.get("/admin-auth",requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})

// update profile
router.put('/profile',requireSignIn,updateProfileController)



module.exports = router;