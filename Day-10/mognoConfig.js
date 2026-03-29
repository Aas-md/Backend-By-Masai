let mongoose = require('mongoose');
require('dotenv').config();

let conncetToDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to DB');
}

module.exports = conncetToDB;