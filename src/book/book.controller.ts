import Book from "./book.model";
import { Request, Response } from "express";

export interface CreateBookDto {
    title: string;
    author: string;
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
    const book = await Book.create(req.body);
    res.status(201).json(book);
}

//step2

// export const create = async (req: Request<{}, {}, CreateBookDto>, res: Response) => {
//     try {
//         const { title, author, price, stock, category } = req.body
//         if (!title || !author || !price || !stock) {
//             return res.status(400).json({ message: "Title, author, price, and stock are required." });
//         }
//         const book = await Book.create(req.body)
//         res.status(201).json(book);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error." });
//     }
// }

//step 3
// export const create = async (req: Request<{}, {}, CreateBookDto>, res: Response) => {
//     try {
//         const book = await Book.create(req.body)
//         res.status(201).json(book);

//     } catch (error) {
//         res.status(500).json({ message: "Internal server error." });
//     }
// }


export const getAll = async (req: Request, res: Response) => {
    const books = await Book.find();
    res.status(200).json(books);
}


export const getById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json(book);
}

export const deleteBook = async (req: Request<{ _id: string }>, res: Response) => {
    const deleted = await Book.findById(req.params._id);

    if (deleted) {
        await Book.deleteOne({ _id: req.params._id });
    }

    if (!deleted) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Deleted successfully" });
}


export const updateBook = async (req: Request<{ _id: string }, {}, Partial<CreateBookDto>>, res: Response) => {
    const updated = await Book.findById(req.params._id);
    if (updated) {
        // updated.title = req.body.title || updated.title;
        // updated.author = req.body.author || updated.author;
        // updated.price = req.body.price || updated.price;
        // updated.stock = req.body.stock || updated.stock;
        // updated.category = req.body.category || updated.category;

        Object.assign(updated, req.body);
        await updated.save();
    }

    if (!updated) return res.status(404).json({ message: "Book not found" });

    res.json(updated);
}