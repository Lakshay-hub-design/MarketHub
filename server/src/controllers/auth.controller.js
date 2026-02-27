const { registerUser } = require("../services/auth.services")

const register = async (req, res, next) => {
    const user = await registerUser(req.body)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
}


module.exports = {
    register
}