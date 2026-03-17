const Cart = require('../models/cart.model')
const Razorpay = require('razorpay')
const Order = require('../models/order.model')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const checkoutService = async (userId, shippingAddress) => {
    const cart = await Cart.findOne({ user: userId })
    .populate('items.product')

    if (!cart || cart.items.length === 0) {
        const error = new Error("Cart is empty");
        error.statusCode = 404
        throw error
    }

    const sellerMap = new Map()

    let totalAmount = 0

    for(const item of cart.items){
        const product = item.product
        
        if (!product || !product.isActive) {
            const error = new Error("Product unavailable");
            error.statusCode = 404
            throw error
        }

        if (product.stock < item.quantity) {
            const error = new Error(`Insufficient stock for ${product.title}`);
            error.statusCode = 401
            throw error
        }

        const sellerId = product.seller.toString()

        if(!sellerMap.has(sellerId)){
            sellerMap.set(sellerId, {
                seller: sellerId,
                items: [],
                subtotal: 0
            })
        }

        const sellerOrder = sellerMap.get(sellerId)

        const itemTotal = product.price * item.quantity

        sellerOrder.items.push({
            product: product._id,
            title: product.title,
            price: product.price,
            quantity: item.quantity
        })

        sellerOrder.subtotal += itemTotal

        totalAmount += itemTotal
    }

    const sellerOrders = Array.from(sellerMap.values())

    const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: 'INR  '
    })

    const order = await Order.create({
        user: userId,
        shippingAddress,
        sellerOrders,
        totalAmount,
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: 'PENDING'
    })

    return {
        order,
        razorpayOrder
    }
}

module.exports = {
    checkoutService
}