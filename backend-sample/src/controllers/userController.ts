import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { unlink } from "node:fs/promises";
import path from "path";
import { body, query, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client"; // { Prisma, PrismaClient }
const prisma = new PrismaClient();

import { getUserById } from "../services/userService";
import { updateUser } from "../services/authService";
import { checkUploadFile } from "../utils/file";
import { offset, noCount, cursor } from "../utils/paginate";

// Extend the Request interface to include the userId property
interface CustomRequest extends Request {
  userId?: number; // or string, depending on your ID type
  file?: any;
  user?: any;
}

export const uploadProfile = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // const id = req.params.id;
    const id = req.userId;
    const image = req.file;
    // console.log("Multiple Images array", req.files);  // For multiple files uploaded

    const user = req.user;

    checkUploadFile(image);
    const imageUrl = image.path.replace("\\", "/");

    if (user!.profile) {
      // await unlink(user!.profile); // Delete an old profile image because it accepts just one.
      try {
        await unlink(path.join(__dirname, "../..", user!.profile));
      } catch (error) {
        const userData = {
          profile: imageUrl,
        };
        await updateUser(id!, userData);
      }
    }

    const userData = {
      profile: imageUrl,
    };
    await updateUser(id!, userData);

    res
      .status(200)
      .json({ message: "Successfully uploaded the image.", profile: imageUrl });
  }
);

export const index = [
  // Validate and sanitize fields.
  query("page", "Page number must be integer.").isInt({ gt: 0 }).toInt(),
  query("limit", "Limit number must be integer.").isInt({ gt: 0 }).toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      err.code = "Error_Invalid";
      return next(err);
    }

    const { page, limit } = req.query;
    // const limit = req.query.limit;
    // const cursors = req.query.cursor ? { id: +req.query.cursor } : null;

    // Authorization - if it is "user" role, no one is allowed.
    // Same as - authorise(true, user, "super", "manager", "editor")
    // authorise(false, user, "user");

    const filters = { status: "active" };
    const order = { createdAt: "desc" };
    const fields = {
      id: true,
      name: true,
      phone: true,
      role: true,
      status: true,
      lastLogin: true,
      profile: true,
      createdAt: true,
    };
    // const relation = {};

    const users = await offset(
      prisma.user,
      page,
      limit,
      filters,
      order,
      fields
    );
    // const users = await noCount(prisma.user, page, limit, filters, order, fields);
    // const users = await cursor(
    //   prisma.user,
    //   cursors,
    //   limit,
    //   filters,
    //   order,
    //   fields
    // );
    res.status(200).json(users);
  }),
];

export const store = asyncHandler(async (req, res, next) => {
  res.json({ success: true });
});

export const show = asyncHandler(async (req, res, next) => {
  res.json({ success: true });
});

export const update = asyncHandler(async (req, res, next) => {
  res.json({ success: true });
});

export const destroy = asyncHandler(async (req, res, next) => {
  res.json({ success: true });
});
