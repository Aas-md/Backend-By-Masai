let express = require('express');
let app = express()
let mongoose = require('mongoose')
let profileRouter = require('./profileRouter')

app.use(express.json())

async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/relation-and-design');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDB()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use("/",profileRouter)

app.use("", (req, res) => {
    res.status(404).json({ message: "Not Found" })
})