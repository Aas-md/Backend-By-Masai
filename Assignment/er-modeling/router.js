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

module.exports = router;
