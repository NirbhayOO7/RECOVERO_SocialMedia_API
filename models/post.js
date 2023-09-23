const mongoose = require('mongoose');

//post database schema.

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of ids of all of the comments in this post itself 
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    // include the array of ids of all of the likes on this post itself
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},{
    timestamps:true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;