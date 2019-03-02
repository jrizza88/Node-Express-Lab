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
     
        post[0] ?
            res.status(200).json(post) :
            res.status(404).json({message: "The post with the specified ID does not exist."})
        
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
});

router.delete('/:id', async (req, res) => {
    const deletePost = await db.remove(req.params.id);
    try {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    } 
    catch {
        res.status(500).json({ errorMessage: "Please provide title and contents for the post."})
    }
});

router.put('/:id', async (req, res) => {
    const {title, contents} = req.body;

    if (!title || !contents) {
        res.status(404).json({message: "Please provide title and contents for the post."})
    }

    try {
        const editPost = await db.update(req.params.id, req.body)
        console.log("put request", req.params.id, req.body)
      if (editPost) {
             res.status(200).json(editPost)
             return;
      } else {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist."})
      }
    }
    catch {
        res.status(500).json({ error: "The post information could not be modified."})
    }
})



module.exports = router;