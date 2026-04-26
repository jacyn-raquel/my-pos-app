import {Router} from 'express';
import {createOrderController} from "../controllers/order.controller";
import {validate} from "../middlewares/validate.middleware";
import {createOrderSchema} from "../validations/order.validations";

const orderRouter = Router();

orderRouter.post("/", validate(createOrderSchema), createOrderController);

export default orderRouter;