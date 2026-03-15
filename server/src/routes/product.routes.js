const express = require("express");
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/multer.middleware");
const { createProductController, getProductsController, updateProductController, deleteProductController } = require("../controllers/product.controler");
const router = express.Router();

router.post('/', protect, authorize('SELLER'), upload.array("images", 5), createProductController)
router.put('/:id', protect, authorize('SELLER'), upload.array('images', 5), updateProductController)
router.delete('/:id', protect, authorize('SELLER', deleteProductController))
router.get('/', protect, getProductsController)

module.exports = router