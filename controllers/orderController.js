const mongoose = require('mongoose');
const { isEmpty } = require('lodash');


const Order = mongoose.model('Order');


exports.createOrders = async (req, res) => {
    console.log(req.body);
    const order = await (new Order(req.body)).save();
    if (!order) {
        req.flash('danger', 'Order creation failed');
        res.redirect(`/orders`);
    }
    req.flash('success', 'Order successfuly created');
    res.redirect(`/orders`);
};


exports.getOrders = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 20;
    const skip = (page * limit) - limit;
    const ordersPromise = Order.find({ status: { $nin: [ "cancle" ] } }, { __v: 0 })
        .skip(skip)
        .limit(limit)
        .sort({createdAt: 'desc'});
    const countPromise = Order.count({ status: { $nin: [ "cancle" ] } });
    const [orders, count] = await Promise.all([ordersPromise, countPromise]);
    const pages = Math.ceil(count / limit);

    if (!orders) {
        req.flash('danger', 'Orders not found');
        res.redirect(`/dashboard`);
    }
    if(!orders.length && skip){
        req.flash('info', `The page ${page} doesn't exist.`);
        res.redirect(`/dashboard`);
    }
    res.render('dashboard', { title: 'Dashboard', orders, page, pages, count });
};


exports.getCancledOrder = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 20;
    const skip = (page * limit) - limit;
    const ordersPromise = Order.find({}, { __v: 0 }).where({ status: 'cancle' })
        .skip(skip)
        .limit(limit)
        .sort({updatedAt: 'desc'});
    const countPromise = Order.count({ status: { $nin: [ "cancle" ] } });
    const [orders, count] = await Promise.all([ordersPromise, countPromise]);
    const pages = Math.ceil(count / limit);

    if (!orders) {
        req.flash('danger', 'Orders not found');
        res.redirect(`/dashboard`);
    }
    if(!orders.length && skip){
        req.flash('info', `The page ${page} doesn't exist.`);
        res.redirect(`/dashboard`);
    }
    res.render('dashboard', { title: 'Cancle Orders', orders, page, pages, count });
};


exports.getOrderById = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id }, { __v: 0 });
    if (!order) {
        req.flash('danger', 'Orders not found');
        res.redirect(`/orders`);
    }

    res.render('order', { title: 'Order' , order});
};


exports.getOrderEditById = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id }, { __v: 0 });
    if (!order) {
        req.flash('danger', 'Orders not found');
        res.redirect(`/orders`);
    }

    res.render('editorder', { title: 'Edit Order',  order});
};


exports.updateOrderById = async (req, res) => {
    let order = {
        frequency: req.body.frequency,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: {
            house: req.body['address.house'],
            flat: req.body['address.flat'],
            road: req.body['address.road'],
            area: req.body['address.area'],
            zipCode: req.body['address.zipCode'],
        },
        reach_medium: req.body.reach_medium,
        promo_code: req.body.promo_code,
    };

    let query = {_id:req.params.id};

    Order.update(query, order, (err) => {
        if(err){
            req.flash('danger', 'Order not updated');
            res.redirect(`/orders`);
        }else{
            req.flash('success', 'Order successfully updated');
            res.redirect('/orders');
        }
    });

};

exports.removeOrderById = async (req, res) => {
    let order = {
        status: 'cancle',
    };

    let query = {_id:req.params.id};

    Order.update(query, order, (err) => {
        if(err){
            req.flash('danger', 'Order not deleted');
            res.redirect(`/orders/${req.params.id}`);
        }else{
            req.flash('success', 'Order successfully cancle');
            res.redirect('/dashboard');
        }
    });

    // let query = {_id: req.params.id};
    // Order.findById(req.params.id, (err) => {
    //     if(err){
    //         req.flash('danger', 'Order not found');
    //         res.redirect(`/orders/`);
    //         res.end();
    //     }
    //     Order.remove(query, (err) => {
    //         if(err){
    //             req.flash('danger', 'Order not deleted');
    //             res.redirect(`/orders/`);
    //             res.end();
    //         }else{
    //             req.flash('success', 'order successfully deleted');
    //             res.redirect('/orders/');
    //             res.end();
    //         }
    //     });
    // });
};



