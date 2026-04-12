import {Router} from 'express';
import {healthCheckController} from '../controllers/health.controller';
import {AppError} from '../utils/AppError';
import {asyncHandler} from '../utils/asyncHandler';

const healthRouter = Router();

healthRouter.get("/health", healthCheckController);

// error
healthRouter.get("/error", () => {
	throw new AppError("Test error working!", 404);
});

healthRouter.get("/health", asyncHandler(async (_req, res) => {
    res.json({ success: true });
  }));

export default healthRouter;