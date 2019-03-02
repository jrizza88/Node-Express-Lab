
const express = require('express');

const postRouter = require('./data/postRoutes');

const server = express();

server.use(express.json());

// use server.use when you are ready to incorporate the endpoint from postRouter

// make initial server.get request
server.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to api posts app!</h1>
    `)
})


//export file
module.exports = server;