//this is how we import stuff in nodejs
const http = require('http');

// We need to store the server in a var to activate it
const server = http.createServer((req, res) => {
    res.end("This is my first response");
});

// Takes the port as argument, will process based on NodeJS
server.listen(3000);