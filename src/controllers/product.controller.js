import productModel from '../models/product.js';
// import ImageModel from '../models/Image';

export const createProductController = async (req,res) => {

    try {
        
       const { name,description,price,category,images } =  req.body;

    if(!name){
        return res.status(400).json({
            message:"Product name is required",
        })
    }

    if(!description){
        return res.status(400).json({
            message:"Description is required",
        })
    }    

    if(!price){
        return res.status(400).json({
            message:"Price is required",
        })
    }

    if(!category){
        return res.status(400).json({
            message:"Category is required",
        })
    }    

    if(!images){
        return res.status(400).json({
            message:"Image is required",
        })
    }

    const newProduct = await productModel.create({name,description,price,category,images});

    return res.status(201).json(newProduct);
    }

    
    
    catch (error) {
        return res.status(201).json({
            message:"Internal server error",
        })
    }
    
}

export const getAllProductController = async (req,res) => {

    try {
        const product = await productModel.find();

    return res.status(200).json({
        message:"Products Fetched Successfully",
        product,
    });    
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
        });
    }
    
}

export const getProductbyId = async(req,res)=>{
    try {   
        // ----- Get the id from the request params -----
        const {id} = req.params

        // ----- fetch specific documents from the database by id -----
        const View = await ImageModel.findOne({_id:id})
        
        // ----- Return the response -----
        return res.status(200).json({
        message: "File Fetched Successfully",
        View,
        });

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error",
            error:error.message
        })
    }
}

export const updateProductController = async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
    if(!description) {
        return res.status(400).json({error: "Description is required"});
    }

    if(description.trim().length<10) {
        return res.status(400).json({error: "Description must be at least 10 character long"});
    }

    const product = await productModel.findById(id)

    if(!product){
        return res.status(404).json({error:"Product not found"});
    }

    product.description = description;
    await product.save();

    return res.status(200).json({
        message:"Product updated successfully",
        product
    });
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
        });
    }
}

export const deleteProductController = async (req,res) => {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
        return res.status(404).json({
            error: "Product not found"
        });
    }

    await productModel.findByIdAndDelete(id);

    return res.status(200).json({
        message: "Product deleted successfully"
    });
    
};

