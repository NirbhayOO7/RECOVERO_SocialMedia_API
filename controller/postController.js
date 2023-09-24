const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async (req, res)=>{
    try {
        let post = await Post.create({
            ...req.body,
            user: req.user
        });

        return res.status(200).json({
            message: 'Post created successfully',
            success: true,
            data: {
                content : post.content,
                user: post.user.name,
                comments : post.comments,
                likes: post.likes
            }
        });
    } catch (err) {
        console.log('**********', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//delete post and its assoicate comments and likes.
module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        if (req.user.id == post.user) {

            await Comment.deleteMany({ post: req.params.id });
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({likeable: {$in: post.comments}, onModel: 'Comments'});
            post.deleteOne();

            return res.status(200).json({
                message: "Post and  its associated comments and likes are deleted",
                success: true
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'You can not delete this post'
            })
        }

    } catch (err) {
        console.log('**********', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}