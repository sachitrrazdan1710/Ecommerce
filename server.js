const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

// Configure environment variables
dotenv.config();

// Database config
connectDB();

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Ecommerce App</h1>');
});

// ✅ Test route for health-check
app.get('/api/v1/test', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'API is working ✅',
    timestamp: new Date().toISOString(),
  });
});

// Port config
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
