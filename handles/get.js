const axios = require("axios")

const database = require('../connections/db')
const  li= require('../files/logInsert')

function getFun(req,res){
    let tocken=req.header("temp")
    let q1=`SELECT tockenid FROM tocken where tockenid=? and gett="yes";`
    database.query(q1,[tocken],(err,data)=>{
        var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
        if(!err){
            if(resultArray.length>0){
                let q2="SELECT * FROM students;"
                database.query(q2, async (err, results)=>{
                    if(!err){
                        var da="request Type : "+"get\n"+"Tocken : "+tocken+"\n"+"status : "+"Sucess"
                        await li.logInsert(da)

                        try{
                            const response=await axios({
                                url:"http://localhost:3001",
                                method:"get"
                            });
                        }
                        catch(err){
                            console.log(err)
                        }

                        res.send(results);
                    }
                });
            }
            else{
                var da="request Type : "+"get\n"+"Tocken : "+tocken+"\n"+"status : "+"504 Failure"
                li.logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
}
module.exports = {getFun}
