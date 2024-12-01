import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number; // or the appropriate type for userId, e.g., number
    file?: any;
  }
}
