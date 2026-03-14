const asyncHandler = require('../middlewares/asyncHandler')
const { createCategory, getCategories } = require('../services/category.service')

const createCategoryController = asyncHandler(async (req, res) => {
    const category = await createCategory(req.body)
    
    res.status(201).json({
        success: true,
        data: category
    })
})

const getCategoryController = asyncHandler(async (req, res) => {
    const categories = await getCategories()

    res.status(200).json({
        success: true,
        data: categories
    })
})

module.exports = {
    createCategoryController,
    getCategoryController
}