import { Router } from "express";
import { validate } from "@/middleware/validate.middleware";
import { createUser, getUsers } from "./user.controller";


const userRouter = Router();

userRouter.post("/create", createUser); 
userRouter.get("/", getUsers);
// userRouter.get("/:id", getUserById);

export default userRouter;