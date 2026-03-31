let mongoose = require('mongoose')

let conectToDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/auth_asgn_day_1')
    console.log('Connected to MongoDB')
}

module.exports = conectToDB