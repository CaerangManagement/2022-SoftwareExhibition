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
// model & export
var Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;