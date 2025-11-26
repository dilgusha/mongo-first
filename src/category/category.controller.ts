import Category from "./category.schema"
import { Request, Response } from "express"

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const createCategory = async (req: Request<{}, {}, { name: string, description: string }>, res: Response) => {
    try {
        const { name, description } = req.body
        const category = await Category.create({ name, description })
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({ message: error })

    }
}

export const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params
        const category = await Category.findOne({ _id: id })
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        } else {
            await Category.deleteOne({ _id: id })
            res.status(200).json({ message: "Category deleted successfully" })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const updateCategory = async (req: Request<{ id: string }, {}, { name: string, description: string }>, res: Response) => {
    try {
        const { id } = req.params
        const { name, description } = req.body
        const category = await Category.findOne({ _id:id })
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        } else {
            await Category.updateOne({ _id:id }, { name, description })
            res.status(200).json({ message: "Category updated successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}