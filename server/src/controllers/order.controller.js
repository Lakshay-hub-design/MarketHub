const asyncHandler = require("../middlewares/asyncHandler");
const { checkoutService, verifyPaymentService } = require("../services/order.service");

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

module.exports = {
    checkoutController,
    verifyPaymentController
}