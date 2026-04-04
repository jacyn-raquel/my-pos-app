import { Router } from "express";
import healthRouter from './health.routes';

const router = Router();

// Service -> Controller -> Routes health check
router.use("/", healthRouter);

export default router;