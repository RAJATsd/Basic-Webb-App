const path = require('path');
const mainDir = require('../util/path');
const newUser = require('../models/adduser');

exports.getLogin = (req,res,next) => {
 res.render('loginpage');
}

exports.postLogin = (req,res,next) => {
    req.session.userName = req.body.userName;
    req.session.password = req.body.password;
    res.redirect('/');
}

exports.getAddList = (req,res,next) => {
    if(req.session.userName){
        res.render('addItems');
    }
    else{
        res.redirect('/login');
    }    
}

exports.postAddList = (req,res,next) => {
    const name = req.body.name;
    const profession = req.body.profession;
    const imgUrl = req.body.imgUrl;
    const user = new newUser({
        name:name, 
        profession:profession,
        imgUrl:imgUrl});
    user
    .save()
    .then(result => {
        console.log('user saved');
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.showList = (req,res,next) => {
    
    if(req.session.userName){
        newUser.find().
        then(users => {
            res.render('homepage',{
                users: users
            });
        })
        .catch(err => console.log(err));        
    }
    else{
        res.redirect('/login');
    }

};

exports.postDeleteList = (req,res,next) => {
    const userId = req.body.userId;
    newUser.findByIdAndRemove(userId)
    .then(()=>{
        console.log('Destroyed User');
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getLogout = (req,res,next) =>{
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/login');
        }
    });
}


