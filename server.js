
const express = require('express');

const postRoutes = require('./data/postRoutes');

const server = express();

server.use(express.json());

// use server.use when you are ready to incorporate the endpoint from postRouter
server.use('/api/posts', postRoutes);

// make initial server.get request
server.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to api posts app!</h1>
    `)
})

server.get('*', (req, res)=> {
    res.status(404).send(`<h2> Page not found </h2>`)
})


//export file
module.exports = server;