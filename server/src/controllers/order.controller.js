const asyncHandler = require("../middlewares/asyncHandler");
const { checkoutService, verifyPaymentService, getUserOrders, getOrderById } = require("../services/order.service");

const checkoutController = asyncHandler(async (req, res) => {
    const { shippingAddress } = req.body

    const order =  await checkoutService(
        req.user.id,
        shippingAddress
    )

    res.status(200).json({
        success: true,
        data: order
    })
})

const verifyPaymentController = asyncHandler(async (req, res) => {
    const order = await verifyPaymentService(
        req.body,
        req.user.id
    )

    res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: order
    });
})

const getUserOrdersController = asyncHandler(async (req, res) => {
    const orders = await getUserOrders(req.user.id)

    res.status(200).json({
        success: true,
        message: 'Orders fetched succesfully',
        data: orders
    });
})

const getOrderController = asyncHandler(async (req, res) => {
    const order = await getOrderById(
        req.params.id,
        req.user.id
    )

    res.status(200).json({
        success: true,
        message: 'Order fetched succefully',
        data: order
    })
})

module.exports = {
    checkoutController,
    verifyPaymentController,
    getUserOrdersController,
    getOrderController
}