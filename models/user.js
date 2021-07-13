const mongoose = require('mongoose');
const {v1:uuidv1} = require('uuid');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    } ,
    lastName: {
        type: String,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userInfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    }, 
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true})

userSchema.virtual("password")
  .set(function(password){
      this._password = password;
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password)
  })
  .get(function(){
      return this._password
  })

userSchema.methods = {
    authenticate: function(plainPassword){
    return this.securePassword(plainPassword) === this.encry_password
    },
    securePassword: function(plainPassword) {
        if(!plainPassword) return ""
        try{
           return crypto.createHmac('sha256', this.salt)
           .update(plainPassword)
           .digest('hex');
        } catch(err) {
            return ""
        }
    }
}


module.exports = mongoose.model("User", userSchema);
