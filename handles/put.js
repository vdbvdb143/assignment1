const database = require('../connections/db')
const  li= require('../files/logInsert')


function putFun(req,res,id) {
    let tocken=req.header("temp")
    let fn=req.body.first_name

    let q1=`SELECT tockenid FROM tocken where tockenid=? and put="yes";`
    database.query(q1,[tocken],(err,data)=>{
        var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
        if(!err){
            if(resultArray.length>0){
                let q2="UPDATE students SET first_name = ? WHERE id= ?"
                database.query(q2,[fn,id] ,(err, results)=>{
                    if(!err){
                        var da="request Type : "+"put\n"+"Tocken : "+tocken+"\n"+"status : "+"200 Sucess"
                        li.logInsert(da)
                        res.json({message : "200 Sucess"})
                    }
                });
            }
            else{
                var da="request Type : "+"put\n"+"Tocken : "+tocken+"\n"+"status : "+"504 Failure"
                li.logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
}

module.exports = {putFun}