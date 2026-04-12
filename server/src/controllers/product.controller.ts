import {Request, Response} from 'express';
import {getAllProducts, createProduct} from '../services/product.service';
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

