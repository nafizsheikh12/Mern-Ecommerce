const nodeMailer = require('nodemailer');

const sendEmail = async (option) => {
    const transforter = nodeMailer.createTransport({
       
        service:"gmail",
        auth:{
            user: "nafizahmed773@gmail.com",
            password: "nafiz123456"
        }
    })

    const mailOptions = {
        from :"nafizahmed773@gmail.com",
        to:option.email,
        subject: option.subject,
        text:option.message
    };

   await  transforter.sendMail(mailOptions)
}

module.exports = sendEmail