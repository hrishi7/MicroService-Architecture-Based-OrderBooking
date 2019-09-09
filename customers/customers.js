const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//load mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:root123@ds233596.mlab.com:33596/customerservice123', ()=>{
console.log('Customer service database connected');
})

//load Book model
let Customer = require('./Customer');

app.get('/', (req, res)=>{
    res.send('this is customerservice endpoint')
})

//create func
app.post('/customer', async (req, res)=>{
    let newCustomer = {
        CustomerName: req.body.CustomerName,
        CustomerAge: req.body.CustomerAge,
        CustomerEmail: req.body.CustomerEmail,
    }
    try {
        let b = new Customer(newCustomer);
        await b.save();
        res.json({message:'Customer is Added Succesfully'})
    } catch (error) {
        res.json({message:'server error'})
    }
});

//get all customers
app.get('/customer', async(req, res)=>{
    try {
        let customerlist = await Customer.find();
        res.json(customerlist);
    } catch (error) {
        res.json({message:'server error'})

    }
})

//get single customer
app.get('/customer/:id', async (req, res)=>{
    try {
        let customer = await Customer.findOne({_id:req.params.id});
        res.json(customer);
    } catch (error) {
        res.json({message:'server error'})

    }
})

//delete a single customer with id
app.delete('customer/:id', async(req, res)=>{
    try {
        await Customer.findOneAndDelete({_id: req.params.id});
        res.json({message:'Customer is deleted Successfully'})
    } catch (error) {
        res.json({message:'server error'})

    }
})

const port = process.env.port || 4545;
app.listen(port,
    ()=> console.log(`customer service is running on ${port}`));