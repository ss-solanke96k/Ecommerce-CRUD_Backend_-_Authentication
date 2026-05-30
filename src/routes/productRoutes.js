import express from 'express';
import {createProductController,getAllProductController,updateProductController,
    deleteProductController, 
    getProductbyId} from '../controllers/product.controller.js';


    const router = express.Router();



    router.post('/create',createProductController);
    router.get('/get-product',getAllProductController);
    router.get('/get-by-id/:id',getProductbyId);
    router.patch('/update-product/:id', updateProductController);
    router.delete('/delete-product/:id', deleteProductController);

    export default router;
