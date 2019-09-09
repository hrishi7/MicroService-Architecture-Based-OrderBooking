const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:root123@ds135796.mlab.com:35796/orderservice123', ()=>{
console.log('Order service database connected');
})

//load Book model
let Order = require('./Order');

app.get('/', (req, res)=>{
    res.send('this is orderservice endpoint')
})

//create func
app.post('/order', async (req, res)=>{
    let newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        BookingDate: req.body.BookingDate,
        DeliveryDate: req.body.DeliveryDate,
    }
    try {
        let b = new Order(newOrder);
        await b.save();
        res.json({message:'Order is Succesfull'})
    } catch (error) {
        res.json({message:'server error'})

    }
});

//get all orders
app.get('/order', async(req, res)=>{
    try {
        let orderlist = await Order.find();
        res.json(orderlist);
    } catch (error) {
        res.json({message:'server error'})
    }
})

//get single order
app.get('/order/:id', async (req, res)=>{
    try {
        let order = await Order.findOne({_id:req.params.id});
        let orderObj = {};
        //getting customer name and email
        let customer = await axios.get(`http://localhost:4545/customer/${order.CustomerID}`);
        //getting product or book
        let book = await axios.get(`http://localhost:4444/book/${order.BookID}`);

        orderObj.id = order.id;
        orderObj.customerName= customer.data.CustomerName;
        orderObj.customerEmail= customer.data.CustomerEmail;

        orderObj.title= book.data.title;
        orderObj.price= book.data.price;

        orderObj.orderDate= order.BookingDate;
        orderObj.expectedDeliveryDate= order.DeliveryDate;
        orderObj.status = order.OrderStatus;

        res.json(orderObj);
    } catch (error) {
        res.json({message:'server error'})

    }
});

//update delivery status
app.post('/order/:id/:status', async (req, res)=>{
    try {
        await Order.findOneAndUpdate(
            {_id: req.params.id},
            {$set:{OrderStatus: req.params.status}},
            {$new: true}
            );
            res.json(`Book now is ${req.params.status}`);
        } catch (error) {
            res.json({message:'server error'})
        }
    })

    //delete a single order with id
    app.delete('order/:id', async(req, res)=>{
        try {
            await Order.findOneAndDelete({_id: req.params.id});
            res.json({message:'Order is deleted Successfully'})
        } catch (error) {
            res.json({message:'server error'})

        }
    })

    const port = process.env.port || 4646;
    app.listen(port,
        ()=> console.log(`Order service is running on ${port}`));