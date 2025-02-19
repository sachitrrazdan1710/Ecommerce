const { hashedPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Validation
        if (!name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).send({ message: 'Phone number is required' });
        }
        if (!address) {
            return res.status(400).send({ message: 'Address is required' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' });
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
            password: hashedPwd,
            answer
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
                role:user.role,
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

//forgotPasswordController

const forgotPasswordController = async(req,res) => {
    try{
        const {email,answer,newPassword} = req.body
        if(!email){
            res.status(400).send({message:"Email is required"})
        }
        if(!answer){
            res.status(400).send({message:"answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"})
        }
        
//check
const user = await userModel.findOne({email,answer})
//validation
if(!user){
    return res.status(404).send({
        success:false,
        message:"Wrong Email Or Answer"
    })
}

const hashed = await hashedPassword(newPassword)
await userModel.findByIdAndUpdate(user._id,{password:hashed})
res.status(200).send({
    success:true,
    message:"Password Reset Successfully",
});

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error,
        });
    }
};


//test controller
const testController = (req,res) => {
    res.send("Protected Routes");
}

//update profile
const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  

module.exports = {registerController,loginController,testController,forgotPasswordController,updateProfileController};
