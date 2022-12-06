const http = require('http');
const dotenv = require('dotenv').config();
const app = require('./app');
const connect = require('./config/db.config');

const server = http.createServer(app)
const PORT = process.env.PORT || 3300



connect()

server.listen(PORT, () => {
    console.log("Listen on port " + PORT)
})