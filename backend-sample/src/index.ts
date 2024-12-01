import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
// import bodyParser from 'body-parser';
// import path from "path";

import { limiter } from "./middlewares/rateLimiter";
import isAuth from "./middlewares/isAuth";
import authorise from "./middlewares/authorise";
import userRoutes from "./routes/v1/user";
import authRoutes from "./routes/v1/auth";
import categoryRoutes from "./routes/v1/category";
import productRoutes from "./routes/v1/product";

const app = express();

app.use(helmet());

app.use(express.json()); // application/json
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(cors());
// app.options("*", cors());

app.use(limiter);

app.use("/api/v1", authRoutes);
app.use("/api/v1", isAuth, authorise(false, "admin"), userRoutes); // authorise() is just an example for authorization
app.use("/api/v1", isAuth, categoryRoutes);
app.use("/api/v1", isAuth, productRoutes);

app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message;
  res.status(status).json({ error: message });
});
