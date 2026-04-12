import mongoose from 'mongoose';
import {env} from './env';
import {AppError} from '../utils/AppError';

export const connectDB = async() => {
	if(!env.MONGODB_URI) {
		throw new AppError('MONGODB_URI is missing in environment variables', 404);
	}

	await mongoose.connect(env.MONGODB_URI);
	 console.log("MongoDB connected successfully");
}