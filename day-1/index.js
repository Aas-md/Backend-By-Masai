let express = require('express')
let fs = require('fs')

let app = express()

app.listen(8080,()=>{
    console.log("App is listening on port 8080")
})

app.get("/",(req,res)=>{
    res.send("This is the first response")
})

app.get('/read',(req,res)=>{

    let data = fs.readFile('./data.txt','utf-8')
    res.send("this is the response => " + data)
})