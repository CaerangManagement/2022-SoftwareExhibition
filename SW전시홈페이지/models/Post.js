const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    contents: {
        type : String,
        required : true
    },
    author: {
        type : String,
        required : true
    },
    createdAt:{type:Date, default:Date.now},
})
 
const postSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    contents: {
      type : String,
      required : true
    },
    author: {
        type : String,
        required : true
    },
    image:{type:String},
    team:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
    comments: [commentSchema]
});
 

const Post = mongoose.model('post', postSchema);

module.exports = Post;