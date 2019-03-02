const express = require('express')

const db = require('./db');

const router = express.Router();

router.get('/', async (req, res) => {
    // use try instead of then
    try {
        console.log('query', req.query)
    // define a variable that points to the db above with the 
    // find method and use request query
        const posts = await db.find(req.query)
        res.status(200).json(posts);
    } catch {
        console.log(error)
        res.status(404).json({error: "The posts information could not be retrieved."})
    }

});

module.exports = router;