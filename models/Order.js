const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const orderSchema = new Schema({
    frequency: {
        type: String,
        // required: 'Please enter a frequency',
        trim: true,
    },
    firstname: {
        type: String,
        trim: true,
        required: 'Please enter a firstname',
    },
    lastname: {
        type: String,
        trim: true,
        required: 'Please enter a lastname',
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email address'],
    },
    phone: {
        type: String,
        trim: true,
        required: 'Enter your phone number',
    },
    address: {
        house: {
            type: String,
            trim: true,
            required: 'Please enter your house number',
        },
        flat: {
            type: String,
            trim: true,
        },
        road: {
            type: String,
            trim: true,
            required: 'Please enter your road number',
        },
        area: {
            type: String,
            trim: true,
            required: 'Please enter your area',
        },
        zipCode: {
            type: String,
            trim: true,
            required: 'Please enter your road number',
        },
    },
    reach_medium:{
        type: String,
        lowercase: true,
        trim: true,
    },
    promo_code: {
        type: String,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        lowercase: true,
        trim: true,
    },
}, { timestamps: true });

// orderSchema.plugin(uniqueValidator);
orderSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Order', orderSchema);



