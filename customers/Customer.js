const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    //customername, age, email
    CustomerName:{
        type: String,
        required: true
    } ,
    CustomerAge:{
        type: Number
    },
    CustomerEmail:{
        type: String,
        required: true
    }
});

module.exports = Customer = mongoose.model('customer',CustomerSchema);