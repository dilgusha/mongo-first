import { Schema, model } from "mongoose";

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String }
}, { timestamps: true });

export default model('Book', BookSchema);