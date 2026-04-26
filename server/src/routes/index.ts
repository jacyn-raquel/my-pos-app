import { Router } from "express";
import healthRouter from './health.routes';
import productRouter from './product.routes';
import orderRouter from "./order.routes";

const router = Router();

// Service -> Controller -> Routes health check
router.use("/", healthRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);

export default router;