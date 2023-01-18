const database = require('../connections/db')
function logInsert(da){
    let q3=`Insert into log(logfile) VALUES (?)`
    database.query(q3,[da],(err,re)=>{
        console.log("File inserted")
    })
}

module.exports = {logInsert}