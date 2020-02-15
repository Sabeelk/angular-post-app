const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// this creates an express app, will handle a route
// app is used as a listener for requests coming into nodeJS
const app = express();
const postRoutes = require('./routes/posts');

// connect to the mongodb server here
// This connections returns a promise, handle it with then
mongoose.connect('mongodb+srv://skazi:tv1eqMzx89kkrn8O@cluster0-z3gbd.mongodb.net/post-app?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connection Successful');
    })
    .catch(() => {
        console.log('Connection Error');
    });

// This lets us parse data from a request, package needs to be installed via bodyParser
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
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postRoutes);

// This will export all the middelware for our app
module.exports = app;
