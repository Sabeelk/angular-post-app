const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// use capital starting letter for the schema
// The model actually just gives use a contructor to make a new object
const Post = require('./models/post');

// this creates an express app, will handle a route
// app is used as a listener for requests coming into nodeJS
const app = express();

// connect to the mongodb server here
// This connections returns a promise, handle it with then
mongoose.connect('mongodb+srv://skazi:tv1eqMzx89kkrn8O@cluster0-z3gbd.mongodb.net/post-app?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connection Successful');
    })
    .catch(() => {
        console.log('Connection Error');
    });

// This lets us parse data from a request, package needs to be installed
app.use(bodyParser.json());

// Middleware for allowing access to our resources
// There are other types of headers other than Acc-Cont-Allow-Or
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

//This will handle adding a post, it will simply display it for now
app.post('/api/posts', (req, res, next) => {
        // we first make the new Post object from the mongoose schema
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        });
        post.save(); // Automatically writes to the DB we assigned, its plural
        console.log(post);
        //This is the status we send back to make sure the request doesn't hang
        res.status(201).json({
            message: "post added successfully"
        });
});

// function says what to do for incoming request, we can add other arguements
// Now api/posts is how we will reach our code
app.get('/api/posts',(req, res, next) => {
    Post.find()
        .then((documents) => {
            res.status(200).json({
                message: 'post sent successfully',
                posts: documents
        });        // returns all entries of posts, function passed executes once it's done
    });
});

// This will export all the middelware for our app
module.exports = app;
