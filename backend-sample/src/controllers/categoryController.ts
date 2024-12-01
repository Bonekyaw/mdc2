import asyncHandler from "express-async-handler";

import { getAllCategories } from "../services/categoryService";

export const index = asyncHandler(async (req, res, next) => {
  // Authorization - if it is "user" role, no one is allowed.
  // Same as - authorise(true, user, "super", "manager", "editor")
  // authorise(false, user, "user");

  const categories = await getAllCategories();
  res.status(200).json(categories);
});
