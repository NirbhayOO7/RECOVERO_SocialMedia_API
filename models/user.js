const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//user schema
const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

//pre is a mongoose middleware which calls the callback function before changing/updating a document in user collection.
userSchema.pre("save", function(next){
  const user = this;
  if(this.isModified("password") || this.isNew){
      bcrypt.genSalt(10, function(saltError, salt){
          if(saltError){
              return next(saltError);
          }
          else{
              bcrypt.hash(user.password, salt, function(hashError, hash){
                  if(hashError){
                      return next(hashError);
                  }
                  else{
                      user.password = hash;
                      next();
                  }
              });
          }
      });
  }
  else{
      return next();
  }
});

// function to authenticate the user by comparing the decrypting th password present in database and the matching it with input password
userSchema.methods.comparePassword = async function(password, callback){
  try {
      const isMatched = await bcrypt.compare(password, this.password);
      return callback(null, isMatched);
  } catch (error) {
      return callback(error);        
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;