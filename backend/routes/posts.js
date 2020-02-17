// express has its own router
const Post = require('../models/post');
const multer = require('multer')
const express = require('express');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'png',
    'image/jpg': 'jng',
}

// insitialize multer storage, where and how to store things
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images"); // Where the file will be stored, relative to the server.js file
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowercase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    },
});

//This will handle adding a post, it will simply display it for now
router.post('', multer(storage).single("image"), (req, res, next) => {
    // we first make the new Post object from the mongoose schema
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        //This is the status we send back to make sure the request doesn't hang
        res.status(201).json({
            message: "post added successfully",
            postId: createdPost._id
        });
    });
});

// Edits a post
router.put('/:id',(req, res, next) => {
    const post = new Post({
        _id: req.body.id,      // update recognizes overwriting the id
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        res.status(200).json({message: "update successful"});
    });
})

// function says what to do for incoming request, we can add other arguements
// Now api/posts is how we will reach our code
router.get('',(req, res, next) => {
    Post.find()
        .then((documents) => {
            res.status(200).json({
                message: 'post sent successfully',
                posts: documents                        //documen ts will be porcessed int the service
        });     // returns all entries of posts, function passed executes once it's done
    });
});

router.get('/:id',(req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (true) {
            res.status(200).json(post);
            console.log(post.title);
        } else {
            res.status(404).json({message: "Post not found"});
        }
    });
});

// for deleting posts we will send an id, the :id here is dynamic
// Important that the ID here is sent as part of the URL
router.delete('/:id',(req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: "post deleted"});
    });
});

// This will export all the middelware for our router
module.exports = router;
