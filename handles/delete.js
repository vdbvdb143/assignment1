const database = require('../connections/db')
const  li= require('../files/logInsert')


function deleteFun(req,res,id) {
    let tocken=req.header("temp")
    

    let q1=`SELECT tockenid FROM tocken where tockenid=? and deletee="yes"`
    database.query(q1,[tocken],(err,data)=>{
        var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
        if(!err){
            if(resultArray.length>0){
                let q2="DELETE FROM students WHERE id = ?";
                database.query(q2,[id] ,(err, results)=>{
                    if(!err){
                        var da="request Type : "+"delete\n"+"Tocken : "+tocken+"\n"+"status : "+"200 Sucess"
                        li.logInsert(da)
                        res.json({message : "200 Sucess"})
                    }
                });
            }
            else{
                var da="request Type : "+"delete\n"+"Tocken : "+tocken+"\n"+"status : "+"504 Failure"
                li.logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
}
module.exports = {deleteFun}