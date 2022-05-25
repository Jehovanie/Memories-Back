import mongoose from "mongoose";


////mongoose Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name : String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});


///mongoose model
const PostMessage_Model = mongoose.model("PostMessage", postSchema); /// first name of the table , second schema of the tables

export default PostMessage_Model;