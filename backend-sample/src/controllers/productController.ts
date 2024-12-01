import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { body, query, param, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client"; // { Prisma, PrismaClient }
const prisma = new PrismaClient();

import {
  getAllProducts,
  getProductById,
  addProductToFavourite,
  removeProductFromFavourite,
} from "../services/productService";

interface CustomRequest extends Request {
  userId?: number; // or string, depending on your ID type
}

export const index = [
  // Validate and sanitize fields.
  query("limit", "Limit number must be integer.").isInt({ gt: 0 }).toInt(),
  query("cursor", "Cursor must be integer.")
    .isInt({ gt: 0 })
    .toInt()
    .optional(),
  query("category", "category id must be integer.")
    .isInt({ gt: 0 })
    .toInt()
    .optional(),

  asyncHandler(async (req: CustomRequest, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      err.code = "Error_Invalid";
      return next(err);
    }

    // const { page, limit } = req.query;
    const limit = req.query.limit || 4; // Be aware of error overtaking db rows;
    const cursor = req.query.cursor ? { id: +req.query.cursor } : null;
    const filters = req.query.category
      ? { categoryId: +req.query.category }
      : null;
    const userId = req.userId || 0;

    // Authorization - if it is "user" role, no one is allowed.
    // Same as - authorise(true, user, "super", "manager", "editor")
    // authorise(false, user, "user");

    // const products = await getAllProducts();

    // const filters = { categoryId: 2 };
    const fields = {
      id: true,
      brand: true,
      title: true,
      star: true,
      quantity: true,
      price: true,
      discount: true,
      image: true,
      categoryId: true,
    };
    const relation = {
      users: {
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      },
    };
    const options = { take: limit } as any;
    if (cursor) {
      options.skip = 1;
      options.cursor = cursor;
    }
    if (filters) {
      options.where = filters;
    }
    options.orderBy = { id: "desc" };
    options.select = { ...fields, ...relation };
    // options.include = relation; // Either select or include can be used.

    const products = await getAllProducts(options, +limit);
    res.status(200).json(products);
  }),
];

export const show = [
  // Validate and sanitize fields.
  param("id", "Product ID must be integer.").isInt({ gt: 0 }).toInt(),

  asyncHandler(async (req: CustomRequest, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      err.code = "Error_Invalid";
      return next(err);
    }

    const productId = req.params.id;
    const userId = req.userId || 0;

    const product = await getProductById(+productId, +userId);

    res.status(200).json(product);
  }),
];

export const toggleFavourite = [
  // Validate and sanitize fields.
  body("productId", "Product ID must not be empty.").isInt({ gt: 0 }).toInt(),
  body("favourite", "Favourite must not be empty.").isBoolean(),

  asyncHandler(async (req: CustomRequest, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      err.code = "Error_Invalid";
      return next(err);
    }

    const productId = req.body.productId;
    const favourite = req.body.favourite;
    const userId = req.userId || 0;

    let result;

    if (favourite) {
      result = await addProductToFavourite(+productId, +userId);
    } else {
      result = await removeProductFromFavourite(+productId, +userId);
    }

    res.status(200).json(result);
  }),
];
