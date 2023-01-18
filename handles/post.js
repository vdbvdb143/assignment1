const database = require('../connections/db')
const  li= require('../files/logInsert')


function postFun(req,res){
    let tocken=req.header("temp")

    let first_name=req.body.first_name
    let last_name=req.body.last_name
    let email=req.body.email
    let gender=req.body.gender

    let q1=`SELECT tockenid FROM tocken where tockenid=? and post="yes";`
    database.query(q1,[tocken],(err,data)=>{
        var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
        if(!err){
            if(resultArray.length>0){
                let q2="INSERT INTO students (first_name,last_name,email,gender) VALUES (?,?,?,?);"
                database.query(q2,[first_name,last_name,email,gender], (err, results)=>{
                    if(!err){
                        var da="request Type : "+"post\n"+"Tocken : "+tocken+"\n"+"status : "+"200 Sucess"
                        li.logInsert(da)
                        res.json({message : "200 Sucess"})
                    }
                        
                });
            }
            else{
                var da="request Type : "+"post\n"+"Tocken : "+tocken+"\n"+"status : "+"504 Failure"
                li.logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
}

module.exports = {postFun}