import {Product} from '../models/product.model';


type GetAllProductsOptions = {
	includeInactive?: boolean,
	page?: number,
	limit?: number,
	search?: string,
}

// GET ALL products
export const getAllProducts = async({
	includeInactive = false,
	page = 1,
	limit = 10,
	search = "",
}: GetAllProductsOptions) =>{
	const filter: Record<string, any> = {};

	if(!includeInactive){
		filter.isActive = true;
	}

	if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
      { barcode: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

   const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

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
// export const deleteProductById = async (id: string) => {
// 	const deleteProduct = await Product.findByIdAndDelete(id);

// 	return deleteProduct;
// }


// Deactivate Product by ID - SOFT delete
export const deactivateProductById = async (id: string) => {
	const deactivateProduct = await Product.findByIdAndUpdate(id, {isActive: false}, {new:true, runValidators:true});

	return deactivateProduct;
}

// Reactivate Product by ID - bring back
export const reactivateProductById = async(id:string) => {
	const reactivateProduct = await Product.findByIdAndUpdate(id, {isActive: true}, {new:true, runValidators: true});

	return reactivateProduct;
}
