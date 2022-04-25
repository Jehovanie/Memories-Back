import PostMessage from "../models/post_models.js";


export const getPost = async (req, res) => {

    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const newPost = (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {

    } catch (error) {

    }
}