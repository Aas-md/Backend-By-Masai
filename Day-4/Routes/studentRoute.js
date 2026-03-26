let express = require('express')
let {getStudent,addStudent,updateStudent} = require('../Conrollers/studentController')
let router = express.Router()

let dataCheck = (req,res,next)=>{

    let {name,age,salary} = req.body
    if(!name || !age || !salary){
        res.status(404).json({msg : "The peramters does not accepted"})
    }else{
        next()
    }

}


router.get('/', getStudent)

router.put('/',updateStudent)

router.post('/',dataCheck,addStudent)

module.exports = router