const Post = require('../models/posts');
const fs = require('fs')

module.exports = class API {
    // fetch all posts
    static async fetchAllPost(req, res) {
        try {
            const allPosts = await Post.find();
            res.status(200).json(allPosts);
        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    }

    // fetch post by ID
    static async fetchPostByID(req, res) {
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    }

    // create a post
    static async createPost(req, res) {
        try {
            const post = req.body;
            const imageName = req.file.filename;
            post.image = imageName;
            const createdPost = await Post.create(post);
            res.status(201).json(createdPost);

        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    // update a post
    static async updatePost(req, res) {
        const id = req.params.id;
        let new_image = "";
        if(req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (error) {
                console.log(error);
            }
        } else{
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({message: 'Post updated successfully!'});
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }

    // delete a post
    static async removePost(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndRemove(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({message: 'Post deleted succesfully'});
        } catch (error) {
            res.status(404).json({message: error.message});
        }  
    }
}
