let fs = require('fs')

function getData(){
     let student = JSON.parse(fs.readFileSync('student.json', "UTF-8"))
     return student
}

function addUpdateData(newStudent){
     fs.writeFileSync('student.json', JSON.stringify(newStudent))
}

module.exports = {getData,addUpdateData}