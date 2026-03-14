const express = require("express");
const router = express.Router();

const protect = require('../middlewares/auth.middleware')
const authorize = require('../middlewares/roleMiddleware');
const { createCategoryController, getCategoryController } = require("../controllers/category.controller");

router.post('/', protect, authorize('ADMIN'), createCategoryController)

router.get('/', getCategoryController)

module.exports = router