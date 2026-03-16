const Cart = require("../models/cart.model")
const Product = require("../models/product.model")

const addToCart = async (userId, productId, quantity) => {

    const product = await Product.findById(productId)

    if(!product && !product.isActive){
        const error = new Error('Product not available')
        error.statusCode = 404
        throw error
    }

    const cart = await Cart.findOne({ user: userId })

    if(!cart){
        cart = await Cart.create({
            user: userId,
            items: []
        })
    }

    const exestingItem = cart.items.find(
        item => item.product.toString() === productId
    )

    if(exestingItem){
        const newQuantity = exestingItem.quantity + quantity

        if(newQuantity > product.stock){
            const error = new Error('Stock exceeded')
            error.statusCode = 400
            throw error
        }

        exestingItem.quantity = newQuantity
    }else{
        cart.items.push({
            product: productId,
            quantity,
            priceSnapshot: product.price
        })
    }

    await cart.save()

    return cart
}

const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId })
        .populate({
            path: 'items.product',
            select: 'title price images stock isActive'
        })
        .lean()
    
    if (!cart) {
        return { items: [] };
    }

    return cart
}

const updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId })

    if(!cart){
        const error = new Error('Cart not found')
        error.statusCode = 404
        throw error
    }

    const item = cart.items.find(
        item => item.product.toString() === productId
    )

    item.quantity = quantity

    await cart.save()

    return cart
}

const removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId })

    if(!cart){
        const error = new Error('Cart not found')
        error.statusCode = 404
        throw error
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    )

    await cart.save()

    return cart
}

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId })
    
    if(cart){
        cart.items = []
        await cart.save()
    }

    return cart
}

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
}