let express = require('express')
let app = express()
let studentRout = require('./Routes/studentRoute.js')
const limiter = require('./Midlewares/rateLimitMidleware.js')


app.use(express.json())
app.use(limiter)

app.use('/student', studentRout)



app.get('/', (req, res) => {
    res.send("App is working fine thsi si the the home page")
})

app.use((req, res) => {
    res.send("route is not found please try a different route")
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})