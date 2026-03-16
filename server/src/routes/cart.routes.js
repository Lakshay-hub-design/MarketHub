const express = require('express')
const protect = require('../middlewares/auth.middleware')
const { addToCartController, getCartController, updateCartItemController, removeCartItemController, clearCartController } = require('../controllers/cart.controller')

const router = express.Router()

router.post('/', protect, addToCartController)

router.get("/", protect, getCartController)

router.patch('/', protect, updateCartItemController)

router.delete('/:productId', protect, removeCartItemController)

router.delete('/', protect, clearCartController)

module.exports = router