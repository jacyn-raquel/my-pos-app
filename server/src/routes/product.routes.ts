import {Router} from 'express';
import {getProductsController, createProductController, getProductByIdController, updateProductByIdController, deactivateProductByIdController, reactivateProductByIdController} from '../controllers/product.controller';
import {validate} from "../middlewares/validate.middleware";
import {createProductSchema, updateProductSchema} from "../validations/product.validations";

const productRouter = Router();

productRouter.get("/", getProductsController);
productRouter.post("/", validate(createProductSchema), createProductController);
productRouter.get("/:id", getProductByIdController);
productRouter.patch("/:id", validate(updateProductSchema),updateProductByIdController);
productRouter.patch("/:id/deactivate", deactivateProductByIdController);
productRouter.patch("/:id/reactivate", reactivateProductByIdController);

export default productRouter;