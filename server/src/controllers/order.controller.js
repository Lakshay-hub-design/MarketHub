const asyncHandler = require("../middlewares/asyncHandler");
const { checkoutService } = require("../services/order.service");

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

module.exports = {
    checkoutController
}