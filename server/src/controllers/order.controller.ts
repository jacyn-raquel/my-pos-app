import {Request, Response} from 'express';
import {createOrder} from "../services/order.service";
import {asyncHandler} from "../utils/asyncHandler";

// Create Order controller
export const createOrderController = asyncHandler(
	async(req: Request, res: Response) => {
		const order = await createOrder(req.body);

		res.status(200).json({
			success: true,
			message: "Order created successfully",
			data: order,
		})
	}
)