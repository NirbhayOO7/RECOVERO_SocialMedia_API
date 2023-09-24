const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

//create comment on a post
module.exports.create = async (req, res)=>{

    try {
        const post = await Post.findById(req.body.post);
        if(post){

            let comment = await Comment.create({
                ...req.body,
                user: req.user._id
            });

            post.comments.push(comment); 
            post.save();

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Comment created!",
                success: true
            });
        }
        else{
            return res.status(204).json({
                success: false,
                message: "No such post exist!"
            });
        }
        
    } catch (error) {
        console.log('**********', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//delete comment and its associated likes.

module.exports.destroy = async(req, res)=>{
    try {
        let comment = await Comment.findById(req.params.id)
        if(comment){
            if(comment.user == req.user.id){

                let postId = comment.post;
                await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
                comment.deleteOne();
                await Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}});

                return res.status(200).json({
                    success: true,
                    message: 'Comments and its assoicate like deleted successfully!'
                })

            }else{
                return res.status(401).json({
                    success: false,
                    message: 'You are not authorised to delete this post'
                });
            }

        }else{
            return res.status(204).json({
                success: false,
                message: 'No such comment exist!'
            });
        }
        
    } catch (error) {
        console.log('**********', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}