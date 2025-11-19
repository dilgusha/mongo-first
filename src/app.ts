import express from 'express';
import dotenv from 'dotenv';
import bookRouter from './book/book.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', bookRouter)

export default app;
