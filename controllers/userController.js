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
                        req.flash('danger', err.message);
                        res.redirect('/register')
                    } else {
                        req.flash('success', 'You are registered and can log in.');
                        res.redirect('/login');
                    }
                });
            });
        });
    }
};

exports.getProfile = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }, { __v: 0, password: 0});
    if (!user) {
        req.flash('danger', 'User not found');
        res.redirect(`/dashboard`);
    }
    res.render('userprofile', { title: 'Profile', user });
};

exports.changePassdord = async (req, res) => {
    let user = await User.findOne({ _id: req.params.id }, { __v: 0});
    // console.log(req.body, user.password);
    const checkpassword = bcrypt.compareSync(req.body.current_pass, user.password);
    if(checkpassword && req.body.change_pass === req.body.confirm_pass){

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(req.body.change_pass, salt, (err,hash)=>{
                if (err){
                    console.log(err);
                }
                user.update({ $set: { password: hash }}, (err)=>{
                    if (err){
                        console.log(err);
                        req.flash('danger', err.message);
                        res.redirect('/profile/' + user._id)
                    } else {
                        req.flash('success', 'Password change successfully');
                        res.redirect('/profile/' + user._id);
                    }
                });
            });
        });
    }else {
        req.flash('danger', 'Password Invalid');
        res.redirect('/profile/' + user._id);
    }
};
