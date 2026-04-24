import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: error.issues[0]?.message || "Invalid input",
      errors: error.issues,
    });
  }

  return res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : "Internal server error",
  });
};