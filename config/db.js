const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb databse ${conn.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`error in mongodb ${error}`.bgRed.White)
    }
};

module.exports = connectDB;
