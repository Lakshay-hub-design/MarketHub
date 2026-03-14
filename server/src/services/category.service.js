const Category = require("../models/category.model")

const createCategory = async (data) => {
  const category = await Category.create(data)
  return category
}

const getCategories = async () => {
  return Category.find({ isActive: true })
}

module.exports = {
  createCategory,
  getCategories
}