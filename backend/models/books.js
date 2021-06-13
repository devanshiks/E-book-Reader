const mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
    title: { type: String},
    author: { type: String},
    category: { type: String},
    desc:{type: String},
    aboutauthor:{type: String},
    imgpath: 
    { 
        type: String
    }, 
    bookpath:
    {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('books', BookSchema);