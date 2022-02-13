const User = require('../models/userModel');


const adminAuth = (...roles) => {
   return (req,res,next) => {
       if(!roles.includes(req.user.role)) {
        return next(   res.status(400).json({message:"you are not allowed"}) )
       }
       next()
   }
}

module.exports = adminAuth("admin")