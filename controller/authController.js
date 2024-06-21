const { hashedPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validation
        if (!name) {
            return res.status(400).send({ error: 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({ error: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ error: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).send({ error: 'Phone number is required' });
        }
        if (!address) {
            return res.status(400).send({ error: 'Address is required' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'User already exists',
            });
        }

        // Hash the password
        const hashedPwd = await hashedPassword(password);

        // Save the user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPwd
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error,
        });
    }
};

//POST LOGIN
const loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Inavalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
                
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d',
        });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        });
    }
};

//test controller
const testController = (req,res) => {
    res.send("Protected Routes");
}

module.exports = {registerController,loginController,testController};
