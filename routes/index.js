const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');
const { catchErrors } = require('../handlers/errorHandlers');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wellcome' });
});

/* GET admin page. */
router.get('/dashboard', ensureAuthenticated, catchErrors(orderController.getOrders));
router.get('/orders/page/:page', catchErrors(orderController.getOrders));

// Get user profile
router.get('/profile/:id', ensureAuthenticated, catchErrors(userController.getProfile));

// Change password
router.post('/profile/:id', ensureAuthenticated, catchErrors(userController.changePassdord));

//register form
router.get('/register', ensureAuthenticated, (req, res) => {
    res.render('register');
});
// register proccess
router.post('/register', ensureAuthenticated, userController.userRegistation);

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Admin' });
});

//login process
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res,next);
});

//logout
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success', "You are logged out.");
    res.redirect('/login');
});

//access control
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else {
        req.flash('danger', "Please Login.");
        res.redirect('/login');
    }
}

module.exports = router;
