const nodemailer = require('nodemailer')

const sendEmail = async (to, otp) =>{
try {
    const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: "bicojayvee4@gmail.com",
    pass: "vvnz tdjx dphd lfkf",
  },
});
 const info = await transporter.sendMail({
    from: '"E-Commerce" <example@gmail.com>',
    to,
    subject: "E-Commerce",
     html: `
        <p>Hello,</p>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code expires in 5 minutes.</p>
      `,
  });

  console.log("Message sent:", info.messageId);
} catch (error) {
    
}
}

module.exports = {
    sendEmail
}