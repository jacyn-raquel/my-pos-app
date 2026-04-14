import {Schema, model} from "mongoose";

export interface ProductDocument {
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const productSchema = new Schema<ProductDocument>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	sku: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	// Barcode scanning
	barcode: {
		type: String,
		trim: true,
		default: "",
	},
	// Product search
	category: {
		type: String,
		required: true,
		trim: true,
	},
	// Sales
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	// Profit Reports
	costPrice: {
		type: Number,
		required: true,
		min: 0,
		default: 0,
	},
	stock: {
		type: Number,
		required: true,
		min: 0,
		default: 0,
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true,
	}
},
{
    timestamps: true,
  }
);

export const Product = model<ProductDocument>("Product", productSchema);