const express = require('express')
const { register, verifyEmail, login } = require('../controllers/auth.controller')

const { registerSchema } = require('../validators/auth.validator')
const validate = require('../middlewares/validate')

const router = express.Router()

router.post('/register', validate(registerSchema), register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)

module.exports = router