let express = require('express')
let userRouter = express.Router()
const bcrypt = require('bcrypt');
const UserModel = require('./userModel');
const saltRounds = 2;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
let jwt = require('jsonwebtoken');



userRouter.post('/signup', async (req, res) => {
    let { username, email, password } = req.body

    try {
        let hash = await bcrypt.hash(password, saltRounds)
        let user = await UserModel.create({ username, email, password: hash })
        res.status(201).json({ msg: "Signup successfull", user })

    } catch (err) {
        res.status(500).json({ msg: "Something went wrong: " + err.message })
    }

})

userRouter.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        let user = await UserModel.findOne({ email })
        if (!user)
            res.status(404).json({ msg: "User not found please signup" })
        let hash = user.password
        let result = await bcrypt.compare(password, hash)
        if (result) {
            let token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
            res.status(201).json({ msg: "Login successfull",token })
        }
        else
            res.status(401).json({ msg: "Wrong Password" })

    } catch (err) {
        res.status(500).json({ msg: "Something went wrong: " + err.message })
    }
})


module.exports = userRouter