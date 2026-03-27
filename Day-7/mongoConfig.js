let mongoose = require("mongoose");

let connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/advanceMongoose");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB", err);
    }
}

module.exports = connectToDB;