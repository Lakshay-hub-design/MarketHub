const userModel = require('../models/user.model')
const { generateOtp, hashOtp } = require('../utils/generateOtp')

const registerUser = async (data) => {
    const { name, email, password } = data

    const existing = await userModel.findOne({ email })

    if(existing){
        const error = new Error("User already exists")
        error.statusCode = 400
        throw error
    }

    const otp = generateOtp()
    const hashedOtp = hashOtp(otp)

    const user = await userModel.create({
        name, 
        email, 
        password,
        emailVerificationOtp: hashedOtp,
        emailVerificationOtpExpires: Date.now() + 10 * 60 * 1000
    })

    console.log("OTP:", otp)

    return user
}

const verifyEmailOtp = async (email, otp) => {
    const hashedOtp = hashOtp(otp)

    const user = await userModel.findOne({
        email,
        emailVerificationOtp: hashedOtp,
        emailVerificationOtpExpires: { $gt: Date.now() }
    })

    if(!user){
        const error = new Error("Invalid or expired OTP")
        error.statusCode = 400
        throw error
    }

    user.isVerified = true
    user.emailVerificationOtp = undefined
    user.emailVerificationOtpExpires = undefined

    await user.save()

    return user
}


module.exports = {
    registerUser,
    verifyEmailOtp
}