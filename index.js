const express = require('express')
const database = require('./db')
const file = require('./fs')
const axios = require("axios")

const app = express()
app.use(express.json())
app.listen(3000)

function logInsert(da){
    console.log(da)
    let q3=`Insert into log(logfile) VALUES (?)`
    database.query(q3,[da],(err,re)=>{
        console.log("File inserted")
    })
}

app.get('/aws/get', (req,res)=>{
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
                        await logInsert(da)

                        try{
                            const response=await axios({
                                url:"http://localhost:3001",
                                method:"get"
                            });
                            console.log(response.data)
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
                logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
})

app.post('/aws/post',(req,res)=>{
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
                        logInsert(da)
                        res.json({message : "200 Sucess"})
                    }
                        
                });
            }
            else{
                var da="request Type : "+"post\n"+"Tocken : "+tocken+"\n"+"status : "+"504 Failure"
                logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
})
app.put('/aws/put/:id',(req,res) =>{
    let tocken=req.header("temp")
    let fn=req.body.first_name
    let id=req.params.id
    id=parseInt(id)

    let q1=`SELECT tockenid FROM tocken where tockenid=? and put="yes";`
    database.query(q1,[tocken],(err,data)=>{
        var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
        if(!err){
            if(resultArray.length>0){
                let q2="UPDATE students SET first_name = ? WHERE id= ?"
                database.query(q2,[fn,id] ,(err, results)=>{
                    if(!err){
                        var da="request Type : "+"put\n"+"Tocken : "+tocken+"\n"+"status : "+"200 Sucess"
                        logInsert(da)
                        res.json({message : "200 Sucess"})
                    }
                });
            }
            else{
                var da="request Type : "+"put\n"+"Tocken : "+tocken+"\n"+"status : "+"504 Failure"
                logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
})

app.delete('/aws/delete/:id',(req,res) =>{
    let tocken=req.header("temp")
    let id=req.params.id
    id=parseInt(id)

    let q1=`SELECT tockenid FROM tocken where tockenid=? and deletee="yes"`
    database.query(q1,[tocken],(err,data)=>{
        var resultArray = Object.values(JSON.parse(JSON.stringify(data)))
        if(!err){
            if(resultArray.length>0){
                let q2="DELETE FROM students WHERE id = ?";
                database.query(q2,[id] ,(err, results)=>{
                    if(!err){
                        var da="request Type : "+"delete\n"+"Tocken : "+tocken+"\n"+"status : "+"200 Sucess"
                        logInsert(da)
                        res.json({message : "200 Sucess"})
                    }
                });
            }
            else{
                var da="request Type : "+"delete\n"+"Tocken : "+tocken+"\n"+"status : "+"504 Failure"
                logInsert(da)
                res.json({message : "504 failure"})
            }
        }
    })
})