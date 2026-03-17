const { required } = require('joi')
const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    title: {
        type: String,
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }
})

const sellerOrderSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [orderItemSchema],
    subTotal: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["PENDING","SHIPPED","DELIVERED","CANCELLED"],
        default: 'PENDING'
    }
})

const shippingAddressSchema = new mongoose.Schema({

  name: String,

  phone: String,

  addressLine1: String,

  addressLine2: String,

  city: String,

  state: String,

  pincode: String,

  country: String

});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    shipsingAddress: shippingAddressSchema,
    sellerOrders: [sellerOrderSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING","PAID","FAILED"],
        default: "PENDING"
    },

    razorpayOrderId: String,

    razorpayPaymentId: String
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order