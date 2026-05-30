import express from 'express';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(express.json());

// Product Routes
app.use('/api/product', productRoutes);

export default app;