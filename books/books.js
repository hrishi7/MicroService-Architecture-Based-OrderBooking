const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//load mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:root123@ds363996.mlab.com:63996/bookservice123', ()=>{
console.log('Book service database connected');
})

//load Book model
let Book = require('./Book');

app.get('/', (req, res)=>{
    res.send('this is bookservice endpoint')
})

//create func
app.post('/book', async (req, res)=>{
    let newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher,
        price: req.body.price
    }
    try {
        let b = new Book(newBook);
        await b.save();
        res.json({message:'Book is Added Succesfully'})
    } catch (error) {
        res.json({message:'server error'})
    }
});

//get all book
app.get('/book', async(req, res)=>{
    try {
        let booklist = await Book.find();
        res.json(booklist);
    } catch (error) {
        res.json({message:'server error'})
    }
})

//get single book
app.get('/book/:id', async (req, res)=>{
    try {
        let book = await Book.findOne({_id:req.params.id});
        res.json(book);
    } catch (error) {
        res.json({message:'server error'})
    }

})

//delete a single book with id
app.delete('book/:id', async(req, res)=>{
    try {
        await Book.findOneAndDelete({_id: req.params.id});
        res.json({message:'Book is deleted Successfully'})
    } catch (error) {
        res.json({message:'server error'})
    }
})

const port = process.env.port || 4444;
app.listen(port,
    ()=> console.log(`book service is running on ${port}`));