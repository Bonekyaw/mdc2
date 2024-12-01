import "dotenv/config";

import asyncHandler from "express-async-handler";

import { body, validationResult } from "express-validator";
// import { v4: uuidv4 } from "uuid";
// import moment from 'moment';
const moment = require("moment");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  checkPhoneExist,
  checkPhoneIfNotExist,
  checkOtpErrorIfSameDate,
  checkOtpPhone,
  checkUser,
} from "./../utils/auth";

import {
  getUserByPhone,
  getOtpByPhone,
  createOtp,
  updateOtp,
  createUser,
  updateUser,
} from "../services/authService";
import { getUserById } from "../services/userService";

/*
 * POST localhost:8080/api/v1/register
 * Register a new user using Phone & password only
 * In real world, OTP should be used to verify phone number
 * But in this app, we will simulate fake OTP - 123456
 */

export const register = asyncHandler(async (req, res, next) => {
  const phone = req.body.phone;
  const user = await getUserByPhone(phone);
  checkPhoneExist(user);

  // OTP processing eg. Sending OTP request to Operator
  const otpCheck = await getOtpByPhone(phone);
  const token = rand() + rand();
  let result;
  let otp = "123456";

  if (!otpCheck) {
    const otpData = {
      phone, // phone
      otp, // fake OTP
      rememberToken: token,
      count: 1,
    };

    result = await createOtp(otpData);
  } else {
    const lastRequest = new Date(otpCheck.updatedAt).toLocaleDateString();
    const isSameDate = lastRequest == new Date().toLocaleDateString();

    checkOtpErrorIfSameDate(isSameDate, otpCheck);

    if (!isSameDate) {
      const otpData = {
        otp,
        rememberToken: token,
        count: 1,
        error: 0,
      };
      result = await updateOtp(otpCheck.id, otpData);
    } else {
      if (otpCheck.count === 3) {
        const err: any = new Error(
          "OTP requests are allowed only 3 times per day. Please try again tomorrow,if you reach the limit."
        );
        err.status = 405;
        return next(err);
      } else {
        const otpData = {
          otp,
          rememberToken: token,
          count: {
            increment: 1,
          },
        };
        result = await updateOtp(otpCheck.id, otpData);
      }
    }
  }

  res.status(200).json({
    message: `We are sending OTP to 09${result.phone}.`,
    phone: result.phone,
    token: result.rememberToken,
  });
});

/*
 * POST localhost:8080/api/v1/verify-otp
 * Verify OTP app sent recently
 */

export const verifyOTP = [
  // Validate and sanitize fields.
  body("token", "Token must not be empty.").trim().notEmpty().escape(),
  body("phone", "Invalid Phone Number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 })
    .escape(),
  body("otp", "OTP is not invalid.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 6, max: 6 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      return next(err);
    }
    const { token, phone, otp } = req.body;

    const user = await getUserByPhone(phone);
    checkPhoneExist(user);

    const otpCheck = await getOtpByPhone(phone);
    checkOtpPhone(otpCheck);

    // Wrong OTP allowed 5 times per day
    const lastRequest = new Date(otpCheck!.updatedAt).toLocaleDateString();
    const isSameDate = lastRequest == new Date().toLocaleDateString();
    checkOtpErrorIfSameDate(isSameDate, otpCheck);

    let result;

    if (otpCheck!.rememberToken !== token) {
      const otpData = {
        error: 5,
      };
      result = await updateOtp(otpCheck!.id, otpData);

      const err: any = new Error("Token is invalid.");
      err.status = 400;
      return next(err);
    }

    const difference = moment() - moment(otpCheck!.updatedAt);
    // console.log("Diff", difference);

    if (difference > 90000) {
      // expire at 1 min 30 sec
      const err: any = new Error("OTP is expired.");
      err.status = 403;
      return next(err);
    }

    if (otpCheck!.otp !== otp) {
      // ----- Starting to record wrong times --------
      if (!isSameDate) {
        const otpData = {
          error: 1,
        };
        result = await updateOtp(otpCheck!.id, otpData);
      } else {
        const otpData = {
          error: {
            increment: 1,
          },
        };
        result = await updateOtp(otpCheck!.id, otpData);
      }
      // ----- Ending -----------
      const err: any = new Error("OTP is incorrect.");
      err.status = 401;
      return next(err);
    }

    const randomToken = rand() + rand() + rand();
    const otpData = {
      verifyToken: randomToken,
      count: 1,
      error: 1,
    };
    result = await updateOtp(otpCheck!.id, otpData);

    res.status(200).json({
      message: "Successfully OTP is verified",
      phone: result.phone,
      token: result.verifyToken,
    });
  }),
];

/*
 * POST localhost:8080/api/v1/confirm-password
 * Verify Token and set up password
 */

export const confirmPassword = [
  // Validate and sanitize fields.
  body("token", "Token must not be empty.").trim().notEmpty().escape(),
  body("phone", "Invalid Phone Number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 })
    .escape(),
  body("password", "Password must be 8 digits.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      return next(err);
    }
    const { token, phone, password } = req.body;

    const user = await getUserByPhone(phone);
    checkPhoneExist(user);

    const otpCheck = await getOtpByPhone(phone);
    checkOtpPhone(otpCheck);

    if (otpCheck!.error === 5) {
      const err: any = new Error(
        "This request may be an attack. If not, try again tomorrow."
      );
      err.status = 401;
      return next(err);
    }

    let result;

    if (otpCheck!.verifyToken !== token) {
      const otpData = {
        error: 5,
      };
      result = await updateOtp(otpCheck!.id, otpData);

      const err: any = new Error("Token is invalid.");
      err.status = 400;
      return next(err);
    }

    const difference = moment() - moment(otpCheck!.updatedAt);
    // console.log("Diff", difference);

    if (difference > 300000) {
      // will expire after 5 min
      const err: any = new Error("Your request is expired. Please try again.");
      err.status = 403;
      return next(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const randToken = rand() + rand() + rand();

    const userData = {
      phone: req.body.phone,
      password: hashPassword,
      randToken: randToken,
    };
    const newUser = await createUser(userData);

    // jwt token
    let payload = { id: newUser.id };
    const jwtToken = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Successfully created an account.",
      token: jwtToken,
      user_id: newUser.id,
      randomToken: randToken,
    });
  }),
];

/*
 * POST localhost:8080/api/v1/login
 * Login using phone and password
 */

export const login = [
  // Validate and sanitize fields.
  body("password", "Password must be 8 digits.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      return next(err);
    }

    const { phone, password } = req.body;

    const user = await getUserByPhone(phone);

    checkPhoneIfNotExist(user);

    // Wrong Password allowed 3 times per day
    if (user!.status === "freeze") {
      const err: any = new Error(
        "Your account is temporarily locked. Please contact us."
      );
      err.status = 401;
      return next(err);
    }

    let result;

    const isEqual = await bcrypt.compare(password, user!.password);
    if (!isEqual) {
      // ----- Starting to record wrong times --------
      const lastRequest = new Date(user!.updatedAt).toLocaleDateString();
      const isSameDate = lastRequest == new Date().toLocaleDateString();

      if (!isSameDate) {
        const userData = {
          error: 1,
        };
        result = await updateUser(user!.id, userData);
      } else {
        if (user!.error >= 2) {
          const userData = {
            status: "freeze",
          };
          result = await updateUser(user!.id, userData);
        } else {
          const userData = {
            error: {
              increment: 1,
            },
          };
          result = await updateUser(user!.id, userData);
        }
      }
      // ----- Ending -----------
      const err: any = new Error("Password is wrong.");
      err.status = 401;
      return next(err);
    }

    const randToken = rand() + rand() + rand();
    if (user!.error >= 1) {
      const userData = {
        error: 0,
        randToken: randToken,
      };
      result = await updateUser(user!.id, userData);
    } else {
      const userData = {
        randToken: randToken,
      };
      result = await updateUser(user!.id, userData);
    }

    let payload = { id: user!.id };
    const jwtToken = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Successfully Logged In.",
      token: jwtToken,
      user_id: user!.id,
      randomToken: randToken,
    });
  }),
];

export const refreshToken = [
  // Validate and sanitize fields.
  body("randomToken", "randomToken must not be empty.")
    .trim()
    .notEmpty()
    .escape(),
  body("user_id", "User ID must not be empty.").isInt().toInt(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err: any = new Error("Validation failed!");
      err.status = 400;
      return next(err);
    }

    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const err: any = new Error("You are not an authenticated user!.");
      err.status = 401;
      throw err;
    }
    const { user_id, randomToken } = req.body;
    // let user_id = parseInt(req.body.user_id);  // Hey take care, we want only Integer.

    const user = await getUserById(user_id);
    checkUser(user);

    if (user!.randToken !== randomToken) {
      const userData = {
        error: 5,
      };
      await updateUser(user_id, userData);

      const err: any = new Error(
        "This request may be an attack. Please contact the user team."
      );
      err.status = 400;
      return next(err);
    }

    const randToken = rand() + rand() + rand();

    const userData = {
      randToken: randToken,
    };
    await updateUser(user_id, userData);

    // jwt token
    let payload = { id: user_id };
    const jwtToken = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Successfully sent a new token.",
      token: jwtToken,
      user_id: user_id,
      randomToken: randToken,
    });
  }),
];

const rand = () => Math.random().toString(36).substring(2);
