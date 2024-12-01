import express from "express";

import {
  index,
  show,
  toggleFavourite,
} from "../../controllers/productController";

const router = express.Router();

// GET localhost:8080/api/v1/products
// Get all products
router.get("/products", index);
// router.get('/products', authorise(true, "admin"), index);

// GET localhost:8080/api/v1/products/1234 - get a product
router.get("/products/:id", show);

// POST localhost:8080/api/v1/products/add-favourite
router.post("/products/favourite-toggle", toggleFavourite);

export default router;
