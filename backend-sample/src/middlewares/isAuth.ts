import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include the userId property
interface CustomRequest extends Request {
  userId?: number; // or string, depending on your ID type
}

const isAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err: any = new Error("You are not an authenticated user!.");
    err.status = 401;
    err.code = "Error_Unauthenticated";
    return next(err);
  }

  const token = authHeader!.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: number;
    };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      error.status = 401;
      error.message = "Access Token has expired.";
      error.code = "Error_AccessTokenExpired";
    } else {
      error.status = 400;
      error.message = "Access Token is invalid.";
      error.code = "Error_Attack";
    }

    return next(error);
  }

  // if (!decodedToken) {
  //   const err: any = new Error("You are not an authenticated user!.");
  //   err.status = 401;
  //   err.code = "Error_AccessTokenExpired";
  //   return next(err);
  // }

  req.userId = decodedToken.id;
  next();
};

export default isAuth;
