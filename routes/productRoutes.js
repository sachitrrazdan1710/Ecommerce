const express = require('express')
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController } = require('../controller/productController');
const formidable  = require('express-formidable')

const router = express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//get products
router.get('/get-product',getProductController)

//single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)


module.exports = router;