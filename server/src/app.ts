import express from "express";
import cors from "cors";
import { env } from "./config/env";
import router from "./routes";
import {errorHandler} from "./middlewares/error.middleware";
import {notFoundHandler} from "./middlewares/notFound.middleware";


const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

// app.use((req, _res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });

// 404 Not Found
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;