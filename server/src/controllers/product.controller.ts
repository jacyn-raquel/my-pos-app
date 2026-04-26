import {Request, Response} from 'express';
import {getAllProducts, createProduct, getProductById, updateProductById, deactivateProductById, reactivateProductById} from '../services/product.service';
import {asyncHandler} from '../utils/asyncHandler';
import {AppError} from '../utils/AppError';

// GET products
export const getProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, search, includeInactiveProducts } = req.query as any;

    const result = await getAllProducts({
      includeInactiveProducts,
      page,
      limit,
      search,
    });

    res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  }
);

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

// Deactivate Product By ID
export const deactivateProductByIdController = asyncHandler(
	async (req: Request, res: Response) => {
		const {id} = req.params;
		
		const updatedProduct = await deactivateProductById(id);

		if(!updatedProduct){
			throw new AppError("Product not found", 404);
		}

		res.status(200).json({
			success: true,
			message: "Product deactivated successfully",
			data: updatedProduct
		})
});

// Reactivate Product By ID
export const reactivateProductByIdController = asyncHandler(
	async(req:Request, res:Response) => {
		const {id} = req.params;

		const updatedProduct = await reactivateProductById(id);

		if(!updatedProduct){
			throw new AppError("Product not found", 404);
		}

		res.status(200).json({
			success:true,
			message: "Product reactivated successfully",
			data: updatedProduct
		})
	})




