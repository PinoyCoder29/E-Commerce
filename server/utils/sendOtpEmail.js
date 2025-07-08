const nodemailer = require('nodemailer')
require('dotenv').config()
const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NM_USERNAME,
        pass: process.env.NM_PASSWORD, 
      },
    });

    const info = await transporter.sendMail({
      from: '"E-Commerce" <no-reply@ecommerce.com>',
      to,
      subject: "Your OTP Code – E-Commerce Verification",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">E-Commerce</h1>
            <p style="margin: 0;">Secure. Reliable. Fast.</p>
          </div>

          <div style="padding: 30px;">
            <h2>Hello, ${to}</h2>
            <p>Thank you for signing up with <strong>E-Commerce</strong>. To complete your registration, please use the following One-Time Password (OTP):</p>

            <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0;">
              ${otp}
            </div>

            <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone for your account’s safety.</p>

            <p>If you did not attempt to sign up for an account, you can safely ignore this email.</p>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />

            <p style="font-size: 14px; color: #888;">
              Need help? Contact our support team at <a href="mailto:support@ecommerce.com">support@ecommerce.com</a>.
            </p>
          </div>

          <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
            &copy; ${new Date().getFullYear()} E-Commerce. All rights reserved.
          </div>
        </div>
      </div>
      `
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Email sending failed:", error)
  }
}

module.exports = {
  sendEmail
}
