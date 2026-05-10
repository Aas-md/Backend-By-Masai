let mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
    name: {type : String,required : true},
    email: String,
    isActive: { type: Boolean, default: true }
})

let Student = mongoose.model('Student', studentSchema);

module.exports = Student;