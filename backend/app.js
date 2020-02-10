const express = require('express');

// this creates an express app, will handle a route
// app is used as a listener for requests coming into nodeJS
const app = express();

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



