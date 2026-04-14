import {Router} from 'express';
import {getProductsController, createProductController, getProductByIdController, updateProductByIdController} from '../controllers/product.controller';

const productRouter = Router();

productRouter.get("/", getProductsController);
productRouter.post("/", createProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.patch("/:id", updateProductByIdController);

export default productRouter;