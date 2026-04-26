import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  // MongoDB duplicate key error
  if (err?.code === 11000) {
    if (err.keyPattern?.sku) {
      return res.status(409).json({
        success: false,
        message: "SKU already exists",
      });
    }

    return res.status(409).json({
      success: false,
      message: "Duplicate field value",
    });
  }

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};