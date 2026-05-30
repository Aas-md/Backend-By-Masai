let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Task = require('./taskSchema');
let router = express.Router();

router.post('/', async (req, res) => {

    try {

        let task = await Task.create(req.body);

        return res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while fetching tasks' + err.message });
    }
});

module.exports = router;
