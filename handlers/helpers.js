const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.createAdminUser = async () => {
  const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if(!adminUser) {
    let newUser = new User({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(newUser.password, salt, (err,hash)=>{
        if (err){
          console.log(err);
        }
        newUser.password =  hash;
        newUser.save((err)=>{
          if (err){
            console.error(err);
            process.exit(1);
          } else {
            console.log('You are registered and can log in.');
          }
        });
      });
    });
  } else {
    console.log('Admin user with this email already exist');
  }
};

exports.showAreas = () => {
    let areas = ['Azimpur','Badda','Banani','Baridhara','Bashabo','Bashundhara R/A','Dhanmondi','Farmgate','Gulshan','Jatrabari','Kakrail','Kamalapur','Khilgaon','khilkhet','Lalbagh','Malibag','Mahammadpur','Mahakhali','Mirpur','Mogbazar','Motijheel','Nikunjo','Rampura','Sutrapur','Shahbag','Uttara','Wari','Other area of Dhaka'];
    return areas;
}
