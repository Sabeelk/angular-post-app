//this is how we import stuff in nodejs
const http = require('http');
//the express app is imported here
const app = require('./backend/app');

// Store the port in a var for reuse
const port = process.env.PORT || 3000;

// set the express app port
app.set('port', port);

// We need to store the server in a var to activate it, pass app
const server = http.createServer(app);

// Takes the port as argument, will process based on NodeJS
// process.env.port is an automatically fed port number provided by nodeJS
server.listen(port);