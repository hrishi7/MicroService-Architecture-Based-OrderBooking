const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    // CustomerID, BookID, BookingDate, DeliveryDate
    CustomerID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    BookID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    BookingDate:{
        type: String
    },
    OrderStatus:{
        type: String,
        default:'CREATED'   //SHIPPED  //DELIVERED
    },
    DeliveryDate:{
        type: String
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);