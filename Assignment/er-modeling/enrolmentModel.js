    let mongoose = require('mongoose');

    let enrolmentSchema = mongoose.Schema({
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true  },
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        enrolledAt: { type: Date, default: Date.now },
        isActive: { type: Boolean, default: true }
    })

    enrolmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

    let enrolment = mongoose.model('Enrolment', enrolmentSchema);

    module.exports = enrolment;