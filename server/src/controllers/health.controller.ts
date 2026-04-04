import {Request, Response} from 'express';
import {getHealthStatus} from '../services/health.service';


export const healthCheckController = (_req: Request, res: Response) => {
	const result = getHealthStatus();

	res.status(200).json(result);
}