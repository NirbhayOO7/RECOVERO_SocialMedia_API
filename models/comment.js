const mongoose = require('mongoose');

//comment database schema.
const commentSchema = new mongoose.Schema({
    comment :{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ]
},{
    timestamps
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;