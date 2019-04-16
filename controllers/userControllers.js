const path = require('path');
const mainDir = require('../util/path');
const newProfile = require('../models/profile');

// exports.getLogin = (req,res,next) => {
//  res.render('loginpage');
// }

// exports.postLogin = (req,res,next) => {
//     req.session.userName = req.body.userName;
//     req.session.password = req.body.password;
//     res.redirect('/');
// }

exports.getAddList = (req,res,next) => {
    if(req.session.email){
        res.render('addItems');
    }
    else{
        res.redirect('/');
    }    
}

exports.postAddList = (req,res,next) => {
    const name = req.body.name;
    const profession = req.body.profession;
    const imgUrl = req.body.imgUrl;
    const email = req.session.email;
    const profile = new newProfile({
        name:name, 
        profession:profession,
        imgUrl:imgUrl,
        email: email});
    profile
    .save()
    .then(result => {
        console.log('profile added');
        res.redirect('/homepage');
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.showList = (req,res,next) => {
    
    if(req.session.email){
        newProfile.find({email:req.session.email}).
        then(profiles => {
            res.render('homepage',{
                profiles: profiles
            });
        })
        .catch(err => console.log('hello'));        
    }
    else{
        res.redirect('/login');
    }

};

exports.postDeleteList = (req,res,next) => {
    const profileId = req.body.profileId;
    newProfile.findByIdAndRemove(profileId)
    .then(()=>{
        console.log('Destroyed profile');
        res.redirect('/homepage');
    })
    .catch(err => {
        console.log(err);
    });
}

// exports.getLogout = (req,res,next) =>{
//     req.session.destroy(err => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.redirect('/login');
//         }
//     });
// }


