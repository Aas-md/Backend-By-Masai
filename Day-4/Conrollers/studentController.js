let {getData,addUpdateData} = require('../Models/studentModel')

let getStudent = (req, res) => {
    let student = getData()
    res.status(200).json({ msg: "Request successfull", student })
}

let updateStudent = (req, res) => {

    let { name, age } = req.body
    let student = getData()
    let newStudent = { ...student, name, age }
   addUpdateData(newStudent)
    res.json({ msg: "success", newStudent })

}

let addStudent = (req,res)=>{

    let newStudent = req.body
    addUpdateData(newStudent)
    res.status(200).json({msg : "student add succesffully",newStudent})
}

module.exports = {getStudent,updateStudent,addStudent}