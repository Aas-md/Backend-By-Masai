let express = require('express')
let todoRouter = express.Router()
let todoModel = require('./todoModel')
const isLogin = require('./midlewares')


todoRouter.post('/add-todo', isLogin('user'), async (req, res) => {

    try {
        let todo = await todoModel.create({ ...req.body, createdBy: req.user })
        res.status(201).json({ msg: "Todo Added successfully", todo })

    } catch (err) {
        res.status(500).json({ msg: "Something went wrong: " + err.message })
    }
})

todoRouter.get('/my-todos', isLogin, async (req, res) => {

    try {
        let todos = await todoModel.find({ createdBy: req.user }).populate("createdBy","username")
        res.status(201).json({ msg: "All todos fetched", todos })
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong: " + err.message })
    }
})

module.exports = todoRouter