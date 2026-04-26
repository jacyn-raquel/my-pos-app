import {Schema, model, Types} from "mongoose";

export type PaymentMethod = "cash" | "card" | "e-wallet" | "other";
export type OrderStatus = "completed" | "voided" | "refunded";

// Order Item
export interface OrderItem {
	product: Types.ObjectId;
	name: string;
	sku: string;
	quantity: number;
	price: number;
	subtotal: number;
}

// Order Document (receipt)
export interface OrderDocument {
	orderNumber: string;
	items: OrderItem[];
	subtotal: number;
	discount: number;
	tax: number;
	total: number;
	paymentMethod: PaymentMethod;
	amountPaid: number;
	change: number;
	status: OrderStatus;
}

// Order Item Schema
export const orderItemSchema = new Schema<OrderItem>({
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},

	name: {
		type: String,
		required: true,
		trim: true,
	},

	sku: {
		type: String,
		required: true,
		trim: true
	},

	quantity: {
		type: Number,
		required: true,
		min: 1,
	},

	price: {
		type: Number,
		required: true,
		min: 0,
	},

	subtotal: {
		type: Number,
		required: true,
		min: 0,
	},

},{
	_id: false,
});

// Order Schema
export const orderSchema = new Schema<OrderDocument>({
	orderNumber: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},

	items: {
		type: [orderItemSchema],
		required: true,
		validate: {
			validator: (items: OrderItem[]) => items.length > 0,
			message: "Order must have at least one item",
		},
	},

	subtotal: {
		type: Number,
		required: true,
		min: 0,
	},

	discount: {
		type: Number,
		default: 0,
		min: 0,
	},

	tax: {
		type: Number,
		default: 0,
		min: 0,
	},

	total: {
		type: Number,
		required: true,
		min: 0,
	},

	paymentMethod: {
		type: String,
		enum: ["cash", "card", "e-wallet", "other"],
		required: true,
	},

	amountPaid: {
		type: Number,
		required: true,
		min: 0,
	},

	change: {
		type: Number,
		required: true,
		min: 0,
	},

	status: {
		type: String,
		enum: ["completed", "voided", "refunded"],
		default: "completed",
	},

}, {
	timestamps: true,
});

// orderSchema.index({orderNumber: 1}, {unique: true});
// orderSchema.index({createdAt: -1});

export const Order = model<OrderDocument>("Order", orderSchema);
