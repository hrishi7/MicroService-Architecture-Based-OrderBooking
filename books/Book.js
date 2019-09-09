const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    // title,author, numPages, publisher
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    numberPages:{
        type: Number,
        require: false
    },
    publisher:{
        type: String,
        require:false
    },
    price:{
        type: String
    }
});

module.exports = Book = mongoose.model("book", BookSchema);