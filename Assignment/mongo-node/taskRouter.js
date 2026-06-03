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
        return res.status(500).json({ error: 'An error occurred while adding tasks' + err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        let tasks = await Task.find()
        res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while fetching tasks' + err.message });
    }
})

router.patch('/:id', async (req, res) => {

    try {
        let task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(401).json({ message: "Task not found with the given id" });
        }
        return res.status(200).json({ message: "Task updated successfully", task });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while updating the task' + err.message });
    }
})

router.delete('/:id', async (req, res) => {

    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(401).json({ message: "Task not found with the given id" });
        }

        return res.status(200).json({ message: "Task deleted successfully", task });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while deleting the task' + err.message });
    }

})

module.exports = router;
