const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

router.post("/buyProduct", productController.postBuyProduct);

module.exports = router;
