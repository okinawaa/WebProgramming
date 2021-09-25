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


app.use('/api/resume',require('./routes/resumeRouter'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}


const data = fs.readFileSync('./mailConfig.json');
const conf = JSON.parse(data);

app.post('/api/form',  (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: conf.email,
            pass: conf.password
        }
    })

    let mailOptions = {
        from: data.email,
        to: conf.email,
        subject: data.subject,
        html: `
            <h3>Informations</h3>
            <ul>    
            <li>Name: ${data.name}</li>
            <li>email: ${data.email}</li>
            </ul>
            
            <h3>Message</h3>
            <p>${data.message}</p>
        `
    };
    smtpTransport.sendMail(mailOptions, (err, response) => {
        if (err) {
            res.send(err)
            console.log("실패")
        } else {
            res.send('Success')
            console.log("성공")
        }
    })

    smtpTransport.close();
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('Sever is running on port ',PORT)
})