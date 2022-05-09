const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

// const fs = require("fs");
const app = express();
const port = 8000;
const hostname = "127.0.0.1";

// mongo specific stuff
mongoose.connect('mongodb://localhost/Am2Pm', {useNewUrlParser: true, useUnifiedTopology: true});
const contactSchema = new mongoose.Schema({  
    name: String,  // variable and variable type
    email: String,
    phone: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

//Express specific Staff
app.use(express.urlencoded());

//static folder specific stufff 
app.use("/static", express.static('static'));

//views specific staff
//set the template engine as pug
app.set('view engine', 'pug')

//set the views directory
app.set('views',path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    res.render('home');
});
app.get('/contact', (req, res)=>{
    res.render('contact');
});

app.post('/contact', (req, res)=>{      
    // console.log(req.body);
    let myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("the data has been successfully saved");
    }).catch(()=>{
        res.send("Item was not saved in DB");
    })
    res.send("Your data have been successfully submitted....");
});

app.post('/contact', (req, res)=>{      // in database as a string format we can store it
    console.log(req.body);
    res.send("Your data have been successfully submitted....");
});


app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
  })
