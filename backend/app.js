const express = require('express');
const bodyParser = require('body-parser');

// this creates an express app, will handle a route
// app is used as a listener for requests coming into nodeJS
const app = express();

// This lets us parse data from a request, package needs to be installed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: false }));

// Middleware for allowing access to our resources
// There are other types of headers other than Acc-Cont-Allow-Or
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", 
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

//This will handle 
app.post((res, res, next) => {
        const post = req.body;
        console.log(post);
        res.status(201).json({
            message: "post added successfully";
        });
})

// The middleware begins here
// uses middleware function on app an incoming request
// a function is says what to do for incoming request, we can add other arguements
// Now api/posts is how we will reach our code
app.use('/api/posts',(req, res, next) => {
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



