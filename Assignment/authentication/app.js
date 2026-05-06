let express = require('express')
let app = express()
let UserModel = require('./userModel')
const mongoose = require('mongoose');
const userRouter = require('./userRouter')

app.use(express.json())
app.use('/users', userRouter)


async function connectToDb() {
    try {
       await  mongoose.connect('mongodb://127.0.0.1:27017/authentication')
        console.log('Connected!')
    } catch (err) {
        console.log(err)
    }
}

connectToDb()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})