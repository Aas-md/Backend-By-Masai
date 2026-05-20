let mongoose = require('mongoose');

let enrolmentSchema = mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    enrolledAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
})

let enrolment = mongoose.model('Enrolment', enrolmentSchema);

module.exports = enrolment;