const Cart = require('../models/cart.model')
const Razorpay = require('razorpay')
const Order = require('../models/order.model')
const Product = require('../models/product.model')
const crypto = require('crypto')
const mongoose = require('mongoose')

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
        currency: 'INR',
        receipt: 'receipt_' + Date.now()
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

const verifyPaymentService = async (data, userId) => {
    const { razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = data

    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex')

    if(expectedSignature !== razorpay_signature){
        const error = new Error('Payment verification failed')
        error.statusCode = 401
        throw error
    }

    const order = await Order.findOne({
        razorpayOrderId: razorpay_order_id
    })

    if(!order){
        const error = new Error('Order not found')
        error.statusCode = 404
        throw error
    }

    if(order.paymentStatus === 'PAID'){
        return order
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id)

    if(payment.status !== 'captured'){
        const error = new Error('Payment not captured')
        error.statusCode = 401
        throw error
    }
  
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        order.paymentStatus = 'PAID'
        order.razorpayPaymentId = razorpay_payment_id 

        await order.save({ session })

        for(const sellerOrder of order.sellerOrders){
            for(const item of sellerOrder.items){

                const result = await Product.updateOne(
                    {
                        _id: item.product,
                        stock: { $gte: item.quantity }
                    },
                    {
                        $inc: { stock: -item.quantity }
                    },
                    { session }
                )

                if(!result.modifiedCount){
                    const error = new Error('Insufficient stock')
                    error.statusCode = 400
                    throw error
                }
            }
        }

        await Cart.updateOne(
            { user: userId },
            { $set: { items: [] } },
            { session }
        )

        await session.commitTransaction()
        session.endSession()

        return order
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;
    }
}

module.exports = {
    checkoutService,
    verifyPaymentService
}