const express = require('express');
require('dotenv').config();
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
// CORS Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello')
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
        }
    })

    smtpTransport.close();
})



// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));

    // index.html for all page routes  html or routing and naviagtion
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});