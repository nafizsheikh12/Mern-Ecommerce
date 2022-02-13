const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const isAuth = async (req,res,next) => {
   const {token} = req.cookies;
    
   if(!token) {
       return res.status(401).json({messsage: "please login"})
   }

   const decodeddata = jwt.verify(token,"hidddenkeypichachudnictomentfuck");

   req.user =  await User.findById(decodeddata.id);
   next()
}


module.exports = isAuth;