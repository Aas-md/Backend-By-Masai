let mongoose = require("mongoose")

let connectToDB = async ()=>{

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/backend-masai-2')
        console.log("Connected to DB")
    }catch(err){
        console.log("Error in connecting to DB : " + err)
    }
}

module.exports = connectToDB