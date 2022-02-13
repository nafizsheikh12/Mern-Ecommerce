const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const jimp = require('jimp')
const path = require('path')

class userController {
    async registerUser (req,res) {
       const {name,email,password,avatar} = req.body;

       const users = User.findOne({email})
     
                 //image buffer
       const imagePath = `${Date.now()}-${Math.round(Math.random() *1e9)}.png`;
       const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/,''), 'base64')

       try{           
        const jimresp = await jimp.read(buffer);
        jimresp.resize(150,jimp.AUTO).write(path.resolve(__dirname,`../img/${imagePath}`))

      }catch(err){
          console.log(err.message)
      }
       const user = await User.create({
           name,
           email,
           password,
           avatar: {
               public_id: 'this is a sample id',
               url: `/img/${imagePath}`
           }
       })


      sendToken(user,201,res)


    
    }


async loginUser (req,res,next) {
    const email = req.body.loginemail;
    const password = req.body.loginpassword;

    // cheeking if user has giver password
    if(!email || !password) {
        return res.status(500).json({message:'enter email & password'})
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(500).json({message: "invalid email"})
    }

    const isPassword = await user.comparePassword(password);


    if(!isPassword){
        return res.status(500).json({message:"invalid email passwrod"})
    }

    const token = user.getJwtToken();

    res.cookie('token',token)
    sendToken(user,200,res)
}



async forgotPassword(req,res,next) {
   
    const user = await User.findOne({email:req.body.email});

    if(!user) {
        return res.status(500).json({message: "user not found"})

    }

    //resetpassword sendToken
   const resetToken = user.getResetPasswordToken();

   await user.save({validateBeforeSave: false})

   const resetpasswordUrl = `http://localhost:4000/api/password/reset/${resetToken}` 
   const message = `your password reset token is : ${resetpasswordUrl} not req this email then , please ignore it`
   try{
      await sendEmail({
          email: user.email,
          subject: `ecommece password recovery`,
          message
      });

      res.status(200).json({success:true,message: `email send to ${user.email} successful`})
   }catch(er){
       user.resetpasswordToken = undefined;
       user.resetpasswordExpire= undefined;

       await user.save({validateBeforeSave: false});
   }

}


async getUserDetails (req,res,next) {
    const user = await User.findById(req.user.id);

    res.status(200).json({success:true,user})
    
         
}

async updatePassword (req,res,next) {
    const user = await User.findById(req.user.id).select("+password");

    const isPassword = await user.comparePassword(req.body.oldpassword);


    if(!isPassword){
        return res.status(500).json({message:"invalid old passwrod"})
    }


    user.password = req.body.newPassword;
    user.save()

    sendToken(user,200,res)
    
         
}

async updateProfile (req,res,next) {
   
    const {name,email} = req.body;

    const user = await User.findByIdAndUpdate(req.user.id,{name,email},{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })

   res.status(200).json({success: true})
    
         
}


// Get all users(admin)
async getAllUser (req, res, next)  {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  };

// Get single user (admin)
async getSingleUser (req, res, next)  {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  };
  

// update User Role -- Admin
async updateUserRole (req, res, next) {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  };

async logout (req,res) {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });

}

}


module.exports = new userController