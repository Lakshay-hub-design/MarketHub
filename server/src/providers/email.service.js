require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
})

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error)
  } else {
    console.log("Email server is ready to send messages")
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"MarketHub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    })

    console.log("Message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.error("Error sending email:", error)
  }
}

async function sendOtpEmail(userEmail, otp) {
  const subject = "Verify Your Email - MarketHub"

  const text = `
    Hello,

    Your One-Time Password (OTP) for verifying your MarketHub account is: ${otp}

    This OTP is valid for 10 minutes.

    If you did not request this, please ignore this email.

    Thank you,
    MarketHub Team
    `

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
      
      <h2 style="color: #333; text-align: center;">Email Verification</h2>
      
      <p style="font-size: 16px; color: #555;">
        Thank you for registering with <strong>MarketHub</strong>.
      </p>

      <p style="font-size: 16px; color: #555;">
        Please use the OTP below to verify your email address:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="
          display: inline-block;
          padding: 15px 25px;
          font-size: 22px;
          letter-spacing: 5px;
          font-weight: bold;
          background-color: #4CAF50;
          color: #ffffff;
          border-radius: 6px;
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size: 14px; color: #777;">
        This OTP is valid for <strong>10 minutes</strong>.
      </p>

      <p style="font-size: 14px; color: #999;">
        If you did not request this email, you can safely ignore it.
      </p>

      <hr style="margin: 25px 0;" />

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © ${new Date().getFullYear()} MarketHub. All rights reserved.
      </p>

    </div>
  </div>
  `

  await sendEmail(userEmail, subject, text, html)
}

module.exports = {
    sendOtpEmail,
}