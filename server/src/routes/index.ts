import { Router } from "express";
import healthRouter from './health.routes';
import productRouter from './product.routes';

const router = Router();

// Service -> Controller -> Routes health check
router.use("/", healthRouter);
router.use("/products", productRouter);

export default router;