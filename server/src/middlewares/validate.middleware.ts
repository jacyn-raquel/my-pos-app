import {NextFunction, Request, Response} from "express";
import {ZodSchema} from "zod";
import {AppError} from "../utils/AppError";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
	const result = schema.safeParse({
		body: req.body,
		params: req.params,
		query: req.query,
	});

	if(!result.success){
		const message = result.error.issues[0]?.message || "Validation error";
		return next(new AppError(message, 404));
	}

	// Important: assign parsed values back
	req.body = result.data.body || req.body;
	req.params = result.data.params || req.params;
	req.query = result.data.query || req.query;

	
	next();
};

