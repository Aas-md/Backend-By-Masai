let mongoose = require('mongoose');

let courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    isActive: { type: Boolean, default: true }
})

let Course = mongoose.model('Course', courseSchema);
module.exports = Course;