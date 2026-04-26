import {Router} from 'express';
import {getProductsController, createProductController, getProductByIdController, updateProductByIdController, deactivateProductByIdController, reactivateProductByIdController} from '../controllers/product.controller';
import {validate} from "../middlewares/validate.middleware";
import {createProductSchema, updateProductSchema, productIdSchema, getProductsQuerySchema} from "../validations/product.validations";

const productRouter = Router();

productRouter.get("/", validate(getProductsQuerySchema),getProductsController);
productRouter.post("/", validate(createProductSchema), createProductController);
productRouter.get("/:id", validate(productIdSchema), getProductByIdController);
productRouter.patch("/:id", validate(productIdSchema), validate(updateProductSchema),updateProductByIdController);
productRouter.patch("/:id/deactivate", validate(productIdSchema), deactivateProductByIdController);
productRouter.patch("/:id/reactivate", validate(productIdSchema), reactivateProductByIdController);

export default productRouter;