let express = require('express');
let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in progress", "completed"], default: "pending" },
    dueDate: { type: Date, default: Date.now() + 2 * 24 * 60 * 60 * 1000 },//two days from now
})

let Task = mongoose.model('Task', taskSchema);

module.exports = Task;