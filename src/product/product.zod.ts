import { z } from "zod";

export const CreateProductSchema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    price: z.number().min(1),
    stock: z.number().min(0),
    category: z.string().optional()
});

export const StockAmountSchema = z.object({
    amount: z.number().min(1)
});