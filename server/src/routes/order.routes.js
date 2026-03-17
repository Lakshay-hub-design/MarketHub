const express = require('express')
const protect = require('../middlewares/auth.middleware')
const { checkoutController } = require('../controllers/order.controller')

const router = express.Router()

router.post('/checkout', protect, checkoutController)

module.exports = router