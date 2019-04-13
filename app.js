const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');

const homepage = require('./routes/userroutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'rajatstuff'
}));

app.use(homepage);


mongoose.connect('mongodb://localhost:27017/lists',{useNewUrlParser:true})
.then(result =>{
    console.log('connected to db');
    app.listen(3000);
}).catch(err => {
    console.log(err);
});