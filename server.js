const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');


//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to ecommerce app</h1>");
})


//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})