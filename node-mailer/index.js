const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req,res) => {
    res.send('welcome to my form')
})

app.post('/api/forma',  (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'yourmail',
            pass: 'yourpassword'
        }
    })

    let mailOptions = {
        from: data.email,
        to: 'yourmail',
        subject: `Message from ${data.name}`,
        html: `
            <h3>Informations</h3>
            <ul>    
            <li>Name: ${data.name}</li>
            <li>Lastname: ${data.lastname}</li>
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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server starting at ${PORT}`)
})