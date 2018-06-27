const express= require("express");
const app=express();
const bodyParser =require('body-parser')
const mongoose = require("mongoose");

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre =require('./models/genre');
Book =require('./models/book');

mongoose.connect('mongodb://localstore/bookstore');
var db = mongoose.connection;

app.get('/', (req,res) =>{
    res.send("working.... use correct api paths")
})

// app.listen(3000);
// console.log('Running on port 3000...');

app.listen(3000, function(){
    console.log("listening to port 3000");
})

app.get('/api/genres', (req,res)=>{
    Genre.getGenres((err, genres)=>{
        if(err){
            throw err;
        }
        res.json(genres);
    })
})

app.post('/api/genres', (req,res)=>{
    var genre=req.body;
    Genre.addGenre(genre, (err,genre)=>
{
    if(err){
        throw err;
    }
    res.json(genre);
})
})

app.put('/api/genres/:_id',(req,res)=>{
    var id= req.params._id;
    var genre =req.body;
    Genre.updateGenre(id, genre, {}, (err,genre)=>{
        if(err){
            throw err;
        }
        res.json(genre);
    })
})

app.delete('/api/genres/:_id', (req,res)=>{
    var id=req.params._id;
    Genre.removeGenre(id, (err,genre)=>{
        if(err){
            throw err;
        }
        res.json(genre);
    })
})

app.get('/api/books', (req,res)=>{
    Book.getBooks((err, book )=>{
        if(err){
            throw err;
        }
        res.json(book);
    })
})

app.get('/api/books/:_id', (req,res)=>{
    var id=req.params._id;
    Book.getBookById(id, (err,book)=>{
        if(err){
            throw err;
        }
        res.json(book)
    })
})

app.post('/api/books', (req,res)=>{
    var book=req.body;
    Book.create(book,(err,book)=>{
        if(err){
            throw err;
        }
        res.json(book);
    })
})

app.put('/api/books', (req,res)=>{
    var id=req.param._id;
    var book=req.body;
    Book.updateBook(id, book,{}, (err,book)=>{
        if(err){
            throw err;
        }
        res.json(book)
    })
})

app.delete('/api/books/:_id',(req,res)=>{
    var id=req.param._id;
    Book.removeBook(id,(err,book)=>{
        if(err){
            throw err;
            res.json(book)
        }
    })
})