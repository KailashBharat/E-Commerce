const express = require("express");
const router = express.Router();

const { createProduct, getAllProductsFromUser, getAllProductsByName } = require("../controllers/products");
const { authorized } = require("../utils/requireLogin");

router.post("/create-product", authorized, createProduct);
router.get("/get-all-products-from-user/:userId", authorized, getAllProductsFromUser);
router.get("/get-all-products-by-name/", authorized, getAllProductsByName);

module.exports = router;
