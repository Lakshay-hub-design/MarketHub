const asyncHandler = require('../middlewares/asyncHandler')
const { addToCart, updateCartItem, removeCartItem, clearCart } = require('../services/cart.service')

const addToCartController = asyncHandler(async (req, res) => {
    const cart = await addToCart(
        req.user.id,
        req.body.productId,
        req.body.quantity
    )

    res.status(200).json({
        success: true,
        message: 'Item added to cart',
        data: cart
    });
})

const getCartController = asyncHandler(async (req, res) => {

  const cart = await getCart(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Cart fetched succesfully',
    data: cart
  });

});

const updateCartItemController = asyncHandler(async (req, res) => {
    const cart = await updateCartItem(
        req.user.id,
        req.body.productId,
        req.body.quantity
    )

    res.status(200).json({
        success: true,
        message: 'Cart item updated succesfully',
        data: cart
    })
})

const removeCartItemController = asyncHandler(async (req, res) => {
    const cart = await removeCartItem(
        req.user.id,
        req.params.id
    )

    res.status(200).json({
        success: true,
        message: 'Cart item removed succesfully',
        data: cart
    })
})

const clearCartController = asyncHandler(async (req, res) => {
    const cart = await clearCart(req.user.id)

    res.status(200).json({
        success: true,
        message: 'Cart cleared succesfully',
        data: cart
    })
})

module.exports = {
    addToCartController,
    getCartController,
    updateCartItemController,
    removeCartItemController,
    clearCartController
}