const asyncHandler = require("../middlewares/asyncHandler");
const { createProduct } = require("../services/product.service");

const createProductController = asyncHandler(async (req, res) => {

    const product = await createProduct(
        req.body,
        req.files,
        req.user.id
    )

    res.status(201).json({
        success: true,
        data: product
    })
})

module.exports = {
    createProductController
}