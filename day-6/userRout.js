let express = require('express')
let userRout = express.Router()
let userModel = require('./userModel')

userRout.get('/', async (req, res) => {

    try {
        let user = await userModel.find({})
        res.status(200).json({ msg: "request is successfull", user })
    } catch (e) {
        console.log("Error in get users  : " + e)
        res.status(500).json({ msg: "Error in get users  : " + e })
    }

})

userRout.post('/', async (req, res) => {

    try {
        let addedUser = await userModel.create(req.body)
        res.status(202).json({ msg: "request is successfull", addedUser })
    } catch (e) {
        console.log("Error in post user : " + e)
        res.status(500).json({ msg: "Error in get users  : " + e })
    }
})

module.exports = userRout