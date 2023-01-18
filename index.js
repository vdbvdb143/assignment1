const express = require('express')

const gtFun = require('./handles/get')
const potFun = require('./handles/post')
const ptFun = require('./handles/put')
const dtFun = require('./handles/delete')


const app = express()
app.use(express.json())
app.listen(3000)



app.get('/aws/get',(req,res)=>{
    return gtFun.getFun(req,res)
})

app.post('/aws/post',(req,res)=>{
    return potFun.postFun(req,res)
})

app.put('/aws/put/:id',(req,res)=>{
    let id=req.params.id
    id=parseInt(id)
    return ptFun.putFun(req,res,id)
})

app.delete('/aws/delete/:id',(req,res)=>{
    let id=req.params.id
    id=parseInt(id)
    return dtFun.deleteFun(req,res)
})
