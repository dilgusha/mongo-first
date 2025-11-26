import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "./category.controller";

const categoryRoute= Router()

categoryRoute.get('/',getAllCategories)
categoryRoute.post('/create',createCategory)
categoryRoute.put('/update/:id',updateCategory)
categoryRoute.delete('/delete/:id',deleteCategory)

export default categoryRoute