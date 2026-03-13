const express = require('express')
const { register, verifyEmail, login, resendOtp, getMe } = require('../controllers/auth.controller')

const { registerSchema } = require('../validators/auth.validator')
const validate = require('../middlewares/validate')
const protect = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/register', validate(registerSchema), register)
router.post('/resend-otp', resendOtp)
router.post('/verify-email', verifyEmail)
router.post('/login', login)

router.get('/me', protect, getMe)

module.exports = router