const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"enter  name"],
       
    },
    email:{
        type:String,
        required:[true,"enter email"],
    },
    password:{
        type:String,
        required:[true,"enter password"],
       maxLength:[21,"password 8 character"]
    },
    avatar:{

         
          public_id:{
              required:true,
              type:String,
          },
          url: {
              type:String,
              required:true
          }
          
      },
    role:{
        type:String,
        default: "user"
       
    },
 
    resetpasswordToken :String,
    resetpasswordExpire: Date,

  
},
{timestamps:true}
)

userSchema.pre('save',async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password= await bcrypt.hash(this.password,10)
})

//compare password
userSchema.methods.comparePassword = async function(epass) {
    return await bcrypt.compare(epass,this.password);
}

//jwt token
userSchema.methods.getJwtToken= function() {
    return jwt.sign({id:this._id},"hidddenkeypichachudnictomentfuck",{
        expiresIn: '5y'
    })
}


//generating password reset token
userSchema.methods.getResetPasswordToken = function () {

    //generating resetpasswordTokenconst reset
    const resetToken = crypto.randomBytes(20).toString("hex")

    //hashing reset password
    this.resetpasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetpasswordExpire = Date.now() +15 *60 * 1000;

    return resetToken
}

module.exports = mongoose.model('ecommerceUser',userSchema)

