import {Product} from '../models/product.model';

// GET ALL products
export const getAllProducts = async() => {
	const products = await Product.find().sort({createdAt: -1});
	return products;
}

type CreateProductInput = {
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  isActive?: boolean;
};

// CREATE products
export const createProduct = async(payload: CreateProductInput) => {
	const product = await Product.create({
		name: payload.name,
		sku: payload.sku,
		barcode: payload.barcode ?? "",
		category: payload.category,
		price: payload.price,
		costPrice: payload.costPrice,
		stock: payload.stock,
		isActive: payload.isActive ?? true,
	})

	return product;
}

// Get Product By ID
export const getProductById = async (id: string) => {
	const product = await Product.findById(id);

	return product;
}

// Update Product By ID
export const updateProductById = async (id: string, payload: Partial<CreateProductInput>) => {
	
	const updatedProduct = await Product.findByIdAndUpdate(id, payload, {new: true, runValidators: true});

	return updatedProduct;
}

// Delete Product By ID - NOT YET FINISHED
export const deleteProductById = async (id: string) => {
	const deleteProduct = await Product.findByIdAndDelete(id);

	return deleteProduct;
}

