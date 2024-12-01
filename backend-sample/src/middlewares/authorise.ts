/*
 * Authorization - middleware
 * These two functions are same
 * authorise(true, "super", "manager", "editor") === authorise(false, "user")
 * true means that his role must be one of these.
 * false means that his role must not be one of these.
 */
import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/userService";

interface CustomRequest extends Request {
  userId?: number; // or string, depending on your ID type
  user?: any;
}

const authorise = (permission: boolean, ...roles: string[]) => {
  return async function (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const id = req.userId;
    const user = await getUserById(id!);
    if (!user) {
      const err: any = new Error("This account has not registered!.");
      err.status = 401;
      return next(err);
    }

    const result = roles.includes(user.role);

    if (!permission && result) {
      const err: any = new Error("This action is not allowed.");
      err.status = 403;
      return next(err);
    }

    if (permission && !result) {
      const err: any = new Error("This action is not allowed.");
      err.status = 403;
      return next(err);
    }
    req.user = user;
    next();
  };
};

export default authorise;
