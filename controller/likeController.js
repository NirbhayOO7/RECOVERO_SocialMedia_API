const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

//like or dislike on post/comment.
module.exports.toggleLike = async (req, res)=>{
    
    try {

        let likeable;
        let deleted = false;

        if(req.query.type === 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        if(likeable){
            let likeExist = await Like.findOne({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });
            
            if(likeExist){
                
                likeable.likes.pull(likeExist._id); 
                likeable.save();            
                likeExist.deleteOne();      
                deleted = true;           
            }
            else{
                let newLike = await Like.create({
                    user: req.user._id,
                    likeable: req.query.id,
                    onModel: req.query.type
                });
    
                likeable.likes.push(newLike._id);
                likeable.save();
            }
    
            return res.status(200).json({
                message: "Request successfull",
                success: true,
                data: {
                    deleted: deleted
                }
            });
        }
        else{

            return res.status(400).json({
                message: "Bad request",
                success: false
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
