import mongoose from "mongoose";
import PostMessage_Model from "../models/post_models.js";


export const getPost = async (req, res) => {

    try {
        const postMessages = await PostMessage_Model.find();

        res.status(200).json(postMessages);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const newPost = async (req, res) => {

    const post = req.body; //this is get from the front-end
    const newPost = new PostMessage_Model(post); //model

    try {

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {

    // const post_id = req.params.id;
    const { id: _id } = req.params; ///get the param id in the req.params and rename it to _id
    const post = req.body; //this is get from the front-end

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id !!!")

    const updatedPost = await PostMessage_Model.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}