import {z} from "zod";

export const createOrderSchema = z.object({
	body: z.object({
		items: z
			.array(
				z.object({
					productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
					quantity: z.number().int("Quantity must be a whole number").min(1, "Quantity must be at least 1"),
				}))
			.min(1, "Order must have at least one item"),

		paymentMethod: z.enum(["cash", "card", "e-wallet", "other"]),

		amountPaid: z.number().min(0, "Amount paid cannot be negative"),

		discount: z.number().min(0, "Discount cannot be negative").optional(),

		tax: z.number().min(0, "Tax cannot be negative").optional(),

	})
});

