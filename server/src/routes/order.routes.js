const express = require('express')
const protect = require('../middlewares/auth.middleware')
const { checkoutController, verifyPaymentController } = require('../controllers/order.controller')

const router = express.Router()

router.post('/checkout', protect, checkoutController)

router.post('/verify', protect, verifyPaymentController)

module.exports = router