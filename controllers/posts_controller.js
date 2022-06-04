import mongoose from "mongoose";

import PostMessage_Model from "../models/post_models.js";

export const getPost = async (req, res) => {

    try {

        ///try to get all post by the mogoose with find
        const postMessages = await PostMessage_Model.find();

        res.status(200).json(postMessages);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;
    try {

        ///try to get all post by the mogoose with find

        /**
         *  QUERY -> /posts?page=1 -> page = 1
         *  PARAMS -> /posts/123 -> id = 123
         */

        const title = new RegExp(searchQuery, 'i') /// 'i' mean ignore case. Test = test = ...
        const posts = await PostMessage_Model.find({
            $or: [  //// $OR :  mean OR like on SQL : i.e find by title or tags
                { title },
                {
                    tags: {
                        $in: tags.split(',') /// $IN : mean IN like on SQL : i.e find where tags in ( ... )
                    }
                }
            ]
        })

        if (posts.length === 0) {
            return res.status(200).json({
                nothingFound: true,
            })
        }

        res.status(200).json(posts);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const newPost = async (req, res) => {

    //this is get from the front-end
    const post = req.body;

    //model
    const newPost = new PostMessage_Model({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {

        ///we can do that because the name of the collection is already define in the mogoose model
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {

    // const post_id = req.params.id;
    ///get the param id in the req.params and rename it to _id
    const { id: _id } = req.params;

    //this is get from the front-end , methode post
    const post = req.body;

    ///check if this id is generated by the mongoose.
    if (!mongoose.Types.ObjectId.isValid(_id)) {

        return res.status(404).send("No post with that id !!!")
    }

    const updatedPost = await PostMessage_Model.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {

    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {

        return res.status(404).send('No post with that id !!!')
    }

    await PostMessage_Model.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully" });
}

export const likePost = async (req, res) => {

    const { id } = req.params;
    ///check user connect
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    //check id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id !!!')
    }

    ///get the post by the id
    const post = await PostMessage_Model.findById(id);

    /// check if this user id is already in like section.
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        /// the user connect don't like the post.
        post.likes.push(String(req.userId));
    } else {

        ///the user is already like the post.
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const update_like_post = await PostMessage_Model.findByIdAndUpdate(id, post, { new: true })

    res.json(update_like_post);
}