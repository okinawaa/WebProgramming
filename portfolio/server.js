require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
})
connection.connect(err => {
    if(err){
        console.log("데이터베이스 에러발생")
        return;
    }
    console.log("Connected Mysql")
});


testQuery = "SELECT * FROM SKILLS";

connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('Sever is running on port ',PORT)
})