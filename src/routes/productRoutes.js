const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.get_all_products);
router.get("/:productId", productController.get_product_by_id);
router.post("/", productController.post_create_product);
router.put("/:id", productController.edit_product);
router.delete("/:id", productController.delete_product);


module.exports = router;