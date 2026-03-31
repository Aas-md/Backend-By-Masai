let express = require('express')
let app = express()
let connectToDB = require('./mongoConfig')
let userRout = require('./userRout')

app.use(express.json())

app.listen(3000,()=>{
    console.log("Server is liesting on port 3000")
})
connectToDB()

app.use('/user',userRout)