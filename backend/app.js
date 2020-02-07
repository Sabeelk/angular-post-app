const express = require('express');

// this creates an express app, will handle a route
// app is used as a listener for requests coming into nodeJS
const app = express();

// The middleware begins here
// uses middleware function on app an incoming request
// a function is says what to do for incoming request
app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res, next) => {
    // sends up a response
    res.send('Hello From express');
});

// This will export all the middelware for our app
module.exports = app;



