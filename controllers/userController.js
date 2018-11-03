const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');



exports.userRegistation = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('username', 'Username is required.');
    req.checkBody('emali', 'Email is required.');
    req.checkBody('pasword', 'Pasword is required.');
    req.checkBody('pasword2', 'Re-pasword is required.');

    let errors = req.validationErrors();

    if(errors){
        res.render({
            errors: errors
        });
    }else {
        let newUser = new User({
            username: username,
            email: email,
            password: password
        });

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if (err){
                    console.log(err);
                }
                newUser.password =  hash;
                newUser.save((err)=>{
                    if (err){
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are registered and can log in.');
                        res.redirect('/login');
                    }
                });
            });
        });
    }
};
