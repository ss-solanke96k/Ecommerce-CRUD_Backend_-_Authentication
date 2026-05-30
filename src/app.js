import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Product Routes
app.use('/api/product', productRoutes);

export default app;