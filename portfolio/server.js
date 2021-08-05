require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())

// Routes

// // connect to mongoDb
// const URI = process.env.MONGODB_URL;
// mongoose.connect(URI,{
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// },err=>{
//     if(err) throw err;
//     console.log('Connected to MongoDB')
// })
//
//
app.get('/', (req,res) => {
    res.send('welcome to my form')
})


app.post('/api/form',  (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    })

    let mailOptions = {
        from: data.email,
        to: process.env.MY_EMAIL,
        subject: `Message from ${data.name}`,
        html: `
            <h3>Informations</h3>
            <ul>    
            <li>Name: ${data.name}</li>
            <li>Subject: ${data.subject}</li>
            <li>Email: ${data.email}</li>
            </ul>
            
            <h3>Message</h3>
            <p>${data.message}</p>
        `
    };
    smtpTransport.sendMail(mailOptions, (err, response) => {
        if (err) {
            res.send(err)
        } else {
            res.send('Success')
            console.log("성공")
        }
    })

    smtpTransport.close();
})

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