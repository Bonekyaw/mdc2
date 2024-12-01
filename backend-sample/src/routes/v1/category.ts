import express from "express";

import { index } from "../../controllers/categoryController";

const router = express.Router();

// GET localhost:8080/api/v1/categories
// Get all categories
router.get("/categories", index);
// router.get('/categories', authorise(true, "admin"), index);

export default router;
