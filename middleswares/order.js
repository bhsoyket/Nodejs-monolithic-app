// const mongoose = require('mongoose');

// const Order = mongoose.model('Order');


exports.validateOrder = (req, res, next) => {
    req.sanitizeBody('frequency');
    req.checkBody('frequency', 'Please enter a frequency').notEmpty();
    req.sanitizeBody('firstname');
    req.checkBody('firstname', 'Please enter a firstname').notEmpty();
    req.sanitizeBody('lastname');
    req.checkBody('lastname', 'Please enter a lastname').notEmpty();
    req.sanitizeBody('email');
    req.sanitizeBody('phone');
    req.checkBody('phone', 'Please enter a phone number').notEmpty();
    req.sanitizeBody('address.house');
    req.checkBody('address.house', 'Please enter a home').notEmpty();
    req.sanitizeBody('address.flat');
    req.checkBody('address.flat', 'Please enter a flat').notEmpty();
    req.sanitizeBody('address.road');
    req.checkBody('address.road', 'Please enter a road').notEmpty();
    req.sanitizeBody('address.area');
    req.checkBody('address.area', 'Please enter a area').notEmpty();
    req.sanitizeBody('address.zipCode');
    req.checkBody('address.zipCode', 'Please enter a zipCode').notEmpty();
    req.sanitizeBody('reach_medium');
    req.sanitizeBody('promo_code');
    const validationErrors = req.validationErrors();
    console.log(validationErrors);

    if (validationErrors) {
        validationErrors.forEach(function(error) {
            req.flash('danger', error.msg);
        });
        res.redirect('/');
        return;
    }

    next();
};
