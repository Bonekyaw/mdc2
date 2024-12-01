import express from "express";

import upload from "../../middlewares/uploadFile";
import {
  uploadProfile,
  index,
  store,
  show,
  update,
  destroy,
} from "../../controllers/userController";

const router = express.Router();

// Upload single image
router.put("/users/upload", upload.single("avatar"), uploadProfile);
// Upload multiple images
// router.put('/users/upload',upload.array('avatar'), userController.uploadProfile );

// GET localhost:8080/api/v1/users?page=1&limit=5
// Get all users by Pagination
router.get("/users", index);
// router.get('/users', authorise(true, "admin"), index);

// POST localhost:8080/api/v1/users - create an user
router.post("/users", store);

// GET localhost:8080/api/v1/users/1234 - get an user
router.get("/users/:id", show);

// PUT localhost:8080/api/v1/users/1234 - Update an user
router.put("/users/:id", update);

// DELETE localhost:8080/api/v1/users/1234 - delete an user
router.delete("/users/:id", destroy);

export default router;
