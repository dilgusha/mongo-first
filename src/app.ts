import express from 'express';
import dotenv from 'dotenv';
import productRouter from '@/product/product.route';
import { validate } from '@/middleware/validate.middleware';
import { CreateProductSchema } from '@/product/product.zod';

dotenv.config();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', validate(CreateProductSchema), productRouter);

export default app;
