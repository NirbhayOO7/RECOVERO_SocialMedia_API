const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

// signup User
module.exports.create = async function(req, res){
    try {

        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            return res.status(202).json({
                message: 'Email id already exist!',
                data: user,
                success: false
            })
        }
        else{
            if(req.body.password != req.body.confirmPassword)
            {
                return res.status(422).json({
                    message: "Password and Confirm Password does not match!",
                    success: false
                })
            }
            user = await User.create(req.body);
            return res.status(200).json({
                message: "User id created, and your password in stored in encrypted format",
                success: true,
                data: user
            });
        }
        
    } catch (error) {
        console.log('Error creating User account', error);
        return res.status(500).json({
            success: false,
            message: "Interval server error"
        });
    }
}

// login User using email and password by using jwt 
module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch)
                {
                    return res.status(200).json({
                        success: true,
                        message: "Sign in successful, here is your token, please keep it safe!",
                        data: {
                            token : jwt.sign(user.toJSON(), env.secretKey , {expiresIn: '1000000'})
                        }
                    });
                }
                else if(!isMatch)
                {
                    return res.status(422).json({
                        success: false,
                        message: "Invalid username or password",
                    });
                }
                else{
                    console.log("Error comparing password", err);
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error"
                    });
                }
            })
        }
        else
        {
            return res.status(422).json({
                success: false,
                message: "Invalid username or password"
            });
        }        
    } catch (error) {
        console.log('Error while loging in user', error);
        return res.status(500).json({
            success: false,
            message:"Internal Server Error"
        })
    }
}