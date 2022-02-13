const sendToken = (user,statusCode,res) => {
    const token = user.getJwtToken();


  

   return res.cookie('token',token,{maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true}).status(statusCode).json({
        success:true,
         user,
         token
    })
}


module.exports = sendToken;