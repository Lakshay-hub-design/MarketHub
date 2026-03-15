const asyncHandler = require("../middlewares/asyncHandler");
const { createProduct, getproducts, updateProduct, deleteProduct } = require("../services/product.service");

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

const getProductsController = asyncHandler(async(req, res) => {
    const products = await getproducts(req.query)

    res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: products
    })
})

const updateProductController = asyncHandler(async (req, res) => {

  const product = await updateProduct(
    req.params.id,
    req.user.id,
    req.body,
    req.files
  )

  res.status(200).json({
    success: true,
    message: 'Product updated succesfully',
    data: product
  })

})

const deleteProductController = asyncHandler(async (req, res) => {
    const product = await deleteProduct(
        req.params.id,
        req.user.id
    )

    res.status(200).json({
        success: true,
        message: 'Product deleted succesfully',
        data: product
    })
})

module.exports = {
    createProductController,
    getProductsController,
    updateProductController,
    deleteProductController
}