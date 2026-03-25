let express = require('express')
let fs = require('fs')
let app = express()
app.use(express.json())

app.listen(3000, () => {
    console.log("server is listening on port 3000")
})

app.get('/', (req, res) => {
    res.send("The server is working finwe thank you for using ")
})

app.get('/cources', (req, res) => {
    let data = fs.readFileSync('data.json', 'UTF-8')
    let cources = JSON.parse(data).cources
    console.log(cources)
    res.json({ msg: "All cources are given as a json", cources })
})

app.post('/cource',(req,res)=>{

    let data = JSON.parse(fs.readFileSync('data.json','UTF-8'))
    let cources = data.cources
    let newCource = req.body
    cources.push(newCource)
    fs.writeFileSync('data.json',JSON.stringify(data))

    res.send("Data added successfully" )
})

