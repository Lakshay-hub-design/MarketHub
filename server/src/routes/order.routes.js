const express = require('express')
const protect = require('../middlewares/auth.middleware')
const { checkoutController, verifyPaymentController, getOrderController, getUserOrdersController } = require('../controllers/order.controller')

const router = express.Router()

router.post('/checkout', protect, checkoutController)

router.post('/verify', protect, verifyPaymentController)

router.get('/', protect, getUserOrdersController)

router.get('/:id', protect, getOrderController)

module.exports = router