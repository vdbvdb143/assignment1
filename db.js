const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    database:'tockens',
    user: "root",
    password: "VdbVdb@2002@"
  });  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = connection