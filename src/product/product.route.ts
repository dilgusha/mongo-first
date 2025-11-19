import { Router } from "express";
import { CreateProductSchema } from "./product.zod";
import { create } from "./product.controller";
import { validate } from "@/middleware/validate.middleware";


const productRouter = Router();
productRouter.post("/", validate(CreateProductSchema), create);

export default productRouter;