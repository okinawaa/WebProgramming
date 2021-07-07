const express = require('express')
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://chanhyuk-tech:a132465das@boilerplate.5c5cy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false,
}).then(()=>console.log("mongoDB connecter"))
    .catch(err=>console.log(err));


app.get('/', (req,res)=> res.send('Hello world!'))

app.listen(port, ()=> console.log(`Example app listening on port ${port}`));

