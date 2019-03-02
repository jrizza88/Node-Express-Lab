const express = require('express')

const db = require('./db');

const router = express.Router();

router.get('/', async (req, res) => {
    // use try instead of then
    try {
        // console.log('query', req.query)
        const posts = await db.find(req.query)
        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "The posts information could not be retrieved."})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        console.log('find by id', req.params.id)
     
        if (post){
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "The post information could not be retrieved."})
    }
});

router.post('/', async (req, res) => {
 const {title, contents} = req.body
    if (!title || !contents) {
        res.status(404).json({errorMessage: "Please provide title and contents for the post."})
        return;
    }

    try {
        const postBody = req.body;
        const post = await db.insert(postBody)
        console.log(postBody)
        if (postBody) {
            res.status(201).json(postBody)
        } 
    } catch (error) {
        res.status(500).json({error: "There was an error while saving the post to the database" })
    }
})

module.exports = router;