import { Router } from "express";
import { CreateBookSchema } from "./book.zod";
import { create } from "./book.controller";
import { validate } from "@/middleware/validate.middleware";


const bookRouter = Router();
bookRouter.post("/", validate(CreateBookSchema), create);

export default bookRouter;