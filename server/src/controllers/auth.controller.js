const asyncHandler = require("../middlewares/asyncHandler");
const { registerUser, verifyEmailOtp, loginUser } = require("../services/auth.services")

const register = asyncHandler(async (req, res, next) => {
    const user = await registerUser(req.body)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
})

const verifyEmail = asyncHandler(async (req, res, next) => {
    const { user, accessToken, refreshToken } = await verifyEmailOtp(req.body)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "strict",
    });

    res.status(200).json({
        success: true,
        message: "Email verified successfully",
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })
})

const login = asyncHandler(async (req, res, next) => {
    const { user, accessToken, refreshToken } = await loginUser(req.body)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    })

    res.status(200).json({
        success: true,
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})


module.exports = {
    register,
    verifyEmail,
    login
}