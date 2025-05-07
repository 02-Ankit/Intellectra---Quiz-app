const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const app = express();

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.render('quiz');
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});