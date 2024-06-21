const express = require('express');
const {registerController,loginController, testController} = require('../controller/authController');
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware');


//router object
const router = express.Router()


//routing

//REGISTER || METHOD POST
router.post('/register',registerController);

//LOGIN || METHOD POST
router.post('/login',loginController);

//test routes
router.get('/test',requireSignIn,isAdmin,testController)


module.exports = router;