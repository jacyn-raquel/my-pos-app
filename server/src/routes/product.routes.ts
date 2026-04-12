import {Router} from 'express';
import {getProductsController, createProductController} from '../controllers/product.controller';

const productRouter = Router();

productRouter.get("/", getProductsController);
productRouter.post("/", createProductController);

export default productRouter;