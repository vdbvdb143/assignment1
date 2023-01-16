const fs = require('fs');
const path = require('path');

function appendLog(data){
    console.log(data)
    fs.appendFile(path.join(__dirname,'files','log.txt'),data,(err)=>{
        if(!err){
            console.log("sucess")
        }   
    })
}
function truncateLog(){
    fs.truncate(path.join(__dirname,'files','log.txt'), '', ()=>{
        console.log('done')
    })
}
module.exports = {appendLog,truncateLog}
