const express = require('express');
const orderController = require('../controllers/orderController');
const order = require('../middleswares/order');
const { catchErrors } = require('../handlers/errorHandlers');
const {showAreas} = require('../handlers/helpers');

const router = express.Router();


/* Get Order Form */
router.get('/', function(req, res) {
    let areas = showAreas();
    res.render('orderform', { title: 'Cleaning Service', areas });
});

/* Get all Cnacle Orders */
router.get('/cancle', ensureAuthenticated, catchErrors(orderController.getCancledOrder));

/* Create Order */
router.post('/', order.validateOrder,  catchErrors(orderController.createOrders));

/* Find Order by id */
router.get('/:id', ensureAuthenticated, catchErrors(orderController.getOrderById));

/* Update Order by id */
router.get('/:id/edit', ensureAuthenticated, catchErrors(orderController.getOrderEditById));

router.post('/:id/update', ensureAuthenticated, catchErrors(orderController.updateOrderById));

/* Delete Order by id */
router.get('/:id/cancle', ensureAuthenticated, catchErrors(orderController.removeOrderById));

/* Verify order */
router.post('/verify/:phone', catchErrors(orderController.verifyOrder));

/* Send otp */
router.get('/sendotp/:phone', catchErrors(orderController.otpResend));

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
