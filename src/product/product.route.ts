import { Router } from "express";
import { CreateProductSchema, StockAmountSchema } from "./product.zod";
import { create, increaseStock, decreaseStock } from "./product.controller";
import { validate } from "@/middleware/validate.middleware";


const productRouter = Router();
productRouter.post("/", validate(CreateProductSchema), create);
productRouter.patch("/:id/increase", validate(StockAmountSchema), increaseStock);
productRouter.patch("/:id/decrease", validate(StockAmountSchema), decreaseStock);

export default productRouter;