import {Request, Response} from 'express';
import {getAllProducts, createProduct, getProductById, updateProductById} from '../services/product.service';
import {asyncHandler} from '../utils/asyncHandler';
import {AppError} from '../utils/AppError';

// GET products
export const getProductsController = asyncHandler(
	async (_req: Request, res: Response) => {
		const products = await getAllProducts();

		res.status(200).json({
			success:true,
			data: products,
		})
	}
)

// CREATE product
export const createProductController = asyncHandler(
	async(req: Request, res: Response) => {
		const {name, sku, barcode, category, price, costPrice, stock, isActive} = req.body;

		if(!name ||
	      !sku ||
	      !category ||
	      price === undefined ||
	      costPrice === undefined ||
	      stock === undefined){
			throw new AppError("Missing required product fields", 400);
		}

		const product = await createProduct({
		  name,
	      sku,
	      barcode,
	      category,
	      price: Number(price),
	      costPrice: Number(costPrice),
	      stock: Number(stock),
	      isActive,
		})

		res.status(201).json({
			success: true,
			message: "Product created successfully",
			data: product,
		});
	}
);

// Get Product By ID
export const getProductByIdController = asyncHandler( async(req: Request, res: Response) => {
	const {id} = req.params;

	const product = await getProductById(id);

	if(!product){
		throw new AppError("Product not found", 404);
	}

	res.status(200).json({
		success: true,
		data: product,
	})
})

// Update Product By ID
export const updateProductByIdController = asyncHandler( async (req: Request, res: Response) => {
	const {id} = req.params;
	const payload = req.body;

	if(!payload || Object.keys(payload).length === 0){
		throw new AppError("No new data provided", 400);
	}

	if(payload.price !== undefined){
		payload.price = Number(payload.price);
	}

	if(payload.costPrice !== undefined){
		payload.costPrice = Number(payload.costPrice);
	}

	if(payload.stock !== undefined){
		payload.stock = Number(payload.stock);
	}

	const updatedProduct =  await updateProductById(id, payload);

	if(!updatedProduct){
		throw new AppError("Product not found", 404);
	}

	res.status(200).json({
		success:true,
		message: "Product updated successfully",
		data: updatedProduct
	})
})


