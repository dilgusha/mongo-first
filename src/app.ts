import express from 'express';
import dotenv from 'dotenv';
import productRouter from '@/product/product.route';
import { validate } from '@/middleware/validate.middleware';
import { CreateProductSchema } from '@/product/product.zod';
import { connect } from 'http2';
import userRouter from './user/user.route';
import { createUser } from './user/user.controller';
import { connectDb } from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

connectDb();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user', userRouter)
// app.post('/user/create', createUser)

export default app;
