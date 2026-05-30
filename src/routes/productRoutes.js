import express from 'express';
import {createProductController,getAllProductController,updateProductController,
    deleteProductController, 
    getProductbyId} from '../controllers/product.controller.js';
import authMiddleware from '../middlewear/authMiddlewear.js';
import {Send_file} from '../config/File.config.js'

    const router = express.Router();

    router.post('/create', authMiddleware, Send_file.array('image'), createProductController);
    router.get('/get-product',getAllProductController);
    router.get('/get-by-id/:id',getProductbyId);
    router.put('/update-product/:id', authMiddleware,updateProductController);
    router.delete('/delete-product/:id', authMiddleware, deleteProductController);



    export default router;
