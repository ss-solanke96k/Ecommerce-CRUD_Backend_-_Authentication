import productModel from '../models/product.js';

//Create product controller name,description,price,category,images are required//
export const createProductController = async (req,res) => {

    try {
        //get the data from req body
       const { name,description,price,category } =  req.body;

       //***Validation for name***//
    if(!name || !price){
        return res.status(400).json({
            message:"Product name and Price is required",
        })
    }

    //Create a new Product in the database
    const newProduct = await productModel.create({name,description,price,category,images});

    //Return the response
    return res.status(201).json({
        message: "Product created successfully",
        newProduct,
    });
    }


    catch (error) {
        return res.status(201).json({
            message:"Internal server error",
        })
    }
    
}


//Get all the product Controller//
export const getAllProductController = async (req,res) => {

    //Find the products
    try {
        const product = await productModel.find();

        //Return the response
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
        //Get id from request params//
        const {id} = req.params

        //fetch specific documents from the database by id
        const View = await ImageModel.findOne({_id:id})
        
        //Return the response
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

//Update a single product//
export const updateProductController = async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        //***Validation***/
    if(!description) {
        return res.status(400).json({error: "Description is required"});
    }

    if(description.trim().length<10) {
        return res.status(400).json({error: "Description must be at least 10 character long"});
    }

    //Find aproduct by id//

    const product = await productModel.findById(id)
    
    //Validation//
    if(!product){
        return res.status(404).json({error:"Product not found"});
    }

    product.description = description;
    await product.save();

    //Return the response//
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


//delete product controller Delete by id//
export const deleteProductController = async (req,res) => {

    const { id } = req.params;

    //find the product by given id//
    const product = await productModel.findById(id);
    
    //check product exist or not//
    if (!product) {
        return res.status(404).json({
            error: "Product not found"
        });
    }

    //Find the product by if and delete//
    await productModel.findByIdAndDelete(id);

    //return the response
    return res.status(200).json({
        message: "Product deleted successfully"
    });
    
};
