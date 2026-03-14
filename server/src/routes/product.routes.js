const express = require("express");
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/multer.middleware");
const { createProductController } = require("../controllers/product.controler");
const router = express.Router();

router.post('/', protect, authorize('SELLER'), upload.array("images", 5), createProductController)

module.exports = router