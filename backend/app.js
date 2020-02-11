const express = require('express');
const bodyParser = require('body-parser');

// use capital starting letter for the schema
// The model actually just gives use a contructor to make a new object
const Post = require('./models/post');

// this creates an express app, will handle a route
// app is used as a listener for requests coming into nodeJS
const app = express();

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
        console.log(post);
        //This is the status we send back to make sure the request doesn't hang
        res.status(201).json({
            message: "post added successfully"
        });
});

// function says what to do for incoming request, we can add other arguements
// Now api/posts is how we will reach our code
app.get('/api/posts',(req, res, next) => {
    const posts = [
        { id: '121', title: 'hello', content: 'this is a posts'},
        { id: '122', title: 'goodbye', content: 'this is a posts'},
    ];
    // Adding the status field assigns a ststus code to the correct repsonse
    res.status(200).json({
        message: 'post sent successfully',
        posts: posts
    });
});

// This will export all the middelware for our app
module.exports = app;



