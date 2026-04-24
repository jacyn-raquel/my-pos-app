import {z} from "zod";

// Create Product Schema
export const createProductSchema = z.object({
	body: z.object({
		name: z.string({error: "Product name is required"}).min(1, "Product name is required"),
		sku: z.string({error: "SKU is required"}).min(1, "SKU is required"),
		barcode: z.string().optional(),
		category: z.string({error: "Category is required"}).min(1, "Category is required"),
		price: z.number().min(0, "Price cannot be negative"),
		costPrice: z.number().min(0, "Cost Price cannot be negative"),
		stock: z.number().min(0, "Stock cannot be negative"),
		isActive: z.boolean().optional()
	})
});

// Update Product Schema
export const updateProductSchema = z
	.object({
		body: z.object({
			name: z.string().min(1).optional(),
			sku: z.string().min(1).optional(),
			barcode: z.string().min(1).optional(),
			category: z.string().min(1).optional(),
			price: z.number().min(0).optional(),
			stock: z.number().min(0).optional(),
			isActive: z.boolean().optional(),
		})
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field is required for update",
	})


})