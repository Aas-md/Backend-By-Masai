let express = require('express')
let app = express()
let conectToDB = require('./mognoConfig')
let userRouter = require('./routes/userRoute')
let bookingRouter = require('./routes/bokingRoute')

app.use(express.json())

conectToDB()
app.use('/users',userRouter)
app.use('/bookings',bookingRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use((req, res) => {
    res.status(404).send("Route Not Found")
})

