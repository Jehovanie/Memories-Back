import mongoose from "mongoose";

/***
 *  Definition de Schema mongoose.
 *  Export de modele mongoose.
 *  
 */


////mongoose Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
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
export default mongoose.model("Post", postSchema); /// first name of the table , second schema of the tables