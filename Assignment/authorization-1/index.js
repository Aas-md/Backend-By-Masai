let express = require('express')
let app = express()
let conectToDB = require('./mognoConfig')
let userRouter = require('./routes/userRoute')

app.use(express.json())

conectToDB()
app.use('/users',userRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use((req, res) => {
    res.send("Please check the url you have requested on a wrong url")
})

