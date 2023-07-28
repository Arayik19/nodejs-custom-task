const express = require("express");
const catalogController = require("../controllers/catalog");

const router = express.Router();

router.get("/catalog/:id", catalogController.getCatalogById);

module.exports = router;
