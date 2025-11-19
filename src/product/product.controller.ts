import Product from "./product.schema";
import { Request, Response } from "express";

export interface CreateProductDto {
    title: string;
    price: number;
    stock: number;
    category?: string;
}

//step1

export const create = async (req: Request, res: Response) => {
    const { title, author, price, stock } = req.body;
    if (!title || !author || !price || !stock) {
        return res.status(400).json({ message: "Title, author, price, and stock are required." });
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
}

//step2

// export const create = async (req: Request<{}, {}, CreateProductDto>, res: Response) => {
//     try {
//         const { title, author, price, stock, category } = req.body
//         if (!title || !author || !price || !stock) {
//             return res.status(400).json({ message: "Title, author, price, and stock are required." });
//         }
//         const product = await Product.create(req.body)
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error." });
//     }
// }

//step 3
// export const create = async (req: Request<{}, {}, CreateProductDto>, res: Response) => {
//     try {
//         const product = await Product.create(req.body)
//         res.status(201).json(product);

//     } catch (error) {
//         res.status(500).json({ message: "Internal server error." });
//     }
// }


export const getAll = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json(products);
}


export const getById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "product not found." });
    }
    res.status(200).json(product);
}

export const deleteProduct = async (req: Request<{ _id: string }>, res: Response) => {
    const deleted = await Product.findById(req.params._id);

    if (deleted) {
        await Product.deleteOne({ _id: req.params._id });
    }

    if (!deleted) return res.status(404).json({ message: "product not found" });

    res.json({ message: "Deleted successfully" });
}


export const updateProduct = async (req: Request<{ _id: string }, {}, Partial<CreateProductDto>>, res: Response) => {
    const updated = await Product.findById(req.params._id);
    if (updated) {
        // updated.title = req.body.title || updated.title;
        // updated.author = req.body.author || updated.author;
        // updated.price = req.body.price || updated.price;
        // updated.stock = req.body.stock || updated.stock;
        // updated.category = req.body.category || updated.category;

        Object.assign(updated, req.body);
        await updated.save();
    }

    if (!updated) return res.status(404).json({ message: "product not found" });

    res.json(updated);
}

export const increaseStock = async (req: Request<{ id: string }, {}, { amount: number }>, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number." });
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found." });
    }

    product.stock += amount;
    await product.save();

    res.status(200).json(product);
}

export const decreaseStock = async (req: Request<{ id: string }, {}, { amount: number }>, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number." });
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found." });
    }

    if (product.stock < amount) {
        return res.status(400).json({ message: "Insufficient stock." });
    }

    product.stock -= amount;
    await product.save();

    res.status(200).json(product);
}