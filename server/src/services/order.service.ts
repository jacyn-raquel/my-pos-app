import {Types} from "mongoose";
import {Product} from "../models/product.model";
import {Order} from "../models/order.model";
import {AppError} from "../utils/AppError";

type OrderItemInput = {
	productId: string;
	quantity: number;
}

type CreateOrderInput = {
	items: OrderItemInput[];
	paymentMethod: "cash" | "card" | "e-wallet" | "other";
	amountPaid: number;
	discount?: number;
	tax?: number;
}

// Create Order service
export const createOrder = async(payload: CreateOrderInput) => {
	const {items, paymentMethod, amountPaid, discount = 0, tax = 0} = payload;

	if(!items || items.length === 0){
		throw new AppError("Order must have at least one item", 400);
	}

	// Extract product IDs
	const productIds = items.map(item => item.productId);

	// fetch products
	const products = await Product.find({_id: {$in: productIds}});

	// Map products by ID for quick lookup
	const productMap = new Map(
		products.map((p) => [p._id.toString(), p]));

	let subtotal = 0;

	const orderItems = items.map((item) => {
		const product = productMap.get(item.productId);

		if(!product){
			throw new AppError(`Product not found: ${item.productId}`, 404);
		}

		if(!product.isActive){
			throw new AppError(`Product is inactive: ${item.productId}`, 400);
		}

		if(product.stock < item.quantity){
			throw new AppError(`Insufficient stock for ${product.name}`,400);
		}

		const itemSubtotal = product.price * item.quantity;

		subtotal += itemSubtotal;

		return {
			product: new Types.ObjectId(item.productId),
			name: product.name,
			sku: product.sku,
			quantity: product.quantity,
			price: product.price,
			subtotal: itemSubtotal,
		}
	})

	const total = subtotal - (discount + tax);

	if (amountPaid < total) {
		throw new AppError("Insufficient payment", 400);
	}

	const change = amountPaid - total;

	// Deduct stock
	await Promise.all(
		orderItems.map((item)=> {
			Product.findByIdAndUpdate(item.product, {$inc: {stock: -item.quantity},})
		}));


	// Generate Order number
	const orderNumber = `ORD-${Date.now()}`;

	const order = await Order.create({
		orderNumber,
		items: orderItems,
		subtotal,
		discount,
		tax,
		total,
		paymentMethod,
		amountPaid,
		change,
		status: "completed"
	});

	return order;

}