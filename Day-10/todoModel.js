let mongoose = require('mongoose')

let todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
    createdBy : {type : mongoose.Schema.Types.ObjectId,ref : "User"}
})

let TodoModel = mongoose.model("Todo", todoSchema)
module.exports = TodoModel