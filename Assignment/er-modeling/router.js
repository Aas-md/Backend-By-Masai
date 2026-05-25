let express = require('express');
let app = express();
let router = express.Router();
let Student = require('./studentModel');
let Course = require('./courceModel');
let Enrolment = require('./enrolmentModel');


router.post('/student', async (req, res) => {
    try {

        let student = await Student.create(req.body)
        return res.status(201).json({ msg: "Student created successfully!", student })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.post('/cource', async (req, res) => {

    try {

        let cource = await Course.create(req.body)
        return res.status(201).json({ msg: "Cource created successfully!", cource })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.post('/enrolment', async (req, res) => {
    try {

        let student = await Student.findById(req.body.studentId);
        let cource = await Course.findById(req.body.courseId);

        if (!student || !cource) {
            return res.status(404).json({ message: "Student or Cource not found" })
        }

        if (student.isActive === false || cource.isActive === false) {
            return res.status(400).json({ message: "Student or Cource is not active" })
        }
        let enrolment = await Enrolment.create(req.body)

        res.status(201).json({ msg: "Enrolment created successfully!", enrolment })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/student/courses/:studentId', async (req, res) => {

    try {
        let student = await Student.findById(req.params.studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        let enrolments = await Enrolment.find({ studentId: req.params.studentId }, { courseId: 1, _id: 0 }).populate('courseId')
        enrolments = enrolments.map(enrolment => enrolment.courseId)

        return res.status(200).json({ student: student.name + " is enrolled in the below courses", courses: enrolments })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


router.get('/course/students/:courseId', async (req, res) => {
    try {

        let enrolements = await Enrolment.find({ courseId: req.params.courseId }, { studentId: 1, _id: 0 }).populate('studentId')
        if (!enrolements) {
            return res.status(404).json({ message: "No enrolments found for this course" })
        }
        let students = enrolements.map(enrolment => enrolment.studentId)
        if (!students.length) {
            return res.status(404).json({ message: "No students found for this course" })
        }

        return res.status(200).json({ course: "Students enrolled in this course are", students })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.delete('/student/:studentId', async (req, res) => {
    try {


        let student = await Student.findByIdAndUpdate(req.params.studentId, { isActive: false }, { new: true })
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        let enrolments = await Enrolment.find({ studentId: req.params.studentId })
        if (!enrolments || !enrolments.length) {

            return res.status(200).json({ message: "Student has been deactivated successfully! No active enrolments found for this student.", student })
        }

        enrolments = await Enrolment.updateMany({ studentId: req.params.studentId }, { isActive: false }, { new: true })

        return res.status(200).json({ message: "Student and their enrolments have been deactivated successfully!", student })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router;
