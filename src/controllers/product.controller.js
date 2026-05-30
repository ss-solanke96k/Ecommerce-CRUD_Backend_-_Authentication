import productModel from '../models/product.js';
import { Delete_file, Upload_files } from "../config/imagekit.js";


//Create product controller name,description,price,category,images are required//
export const createProductController = async (req,res) => {

    try {
        //get the data from req body

        console.log(req.user.email)

       const { name,description,price,category } =  req.body;

        // *** Get the files from the request ***
        const files = req.files;

       //***Validation for name***//
    if(!name || !price){
        return res.status(400).json({
            message:"Product name and Price is required",
        })
    }

   //*** upload files to imagekit ***
    const Transfer = await Promise.all(
      files.map((elem) => Upload_files(elem.buffer, elem.originalname))
    );

    // *** fields and url of the images *** 
    const imageRecords = Transfer.map((elem) => ({
      url: elem.url,
      fileId: elem.fileId
    }));

    // *** Create a new document in the database ***
 const newProduct = await productModel.create({
  description,
  name,
  category,
  price,
  image: imageRecords, 
  user: req.user.email, // Lowercase u
});

    //Return the response
    return res.status(201).json({
        message: "Product created successfully",
        newProduct,
    });
    }


    catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
    
}

//Get all the product Controller//
export const getAllProductController = async (req,res) => {

    // //Find the products
    // try {
    //     const product = await productModel.find();

    //     //Return the response
    // return res.status(200).json({
    //     message:"Products Fetched Successfully",
    //     product,
    // });    
    // } catch (error) {
    //     return res.status(500).json({
    //         message:"Internal server error",
    //     });
    // }


    try {
        // *** Get the data from the request query ***
        const {category} = req.query
      // *** Create a scan object ***
      let scan = {};

    // ***check category is present or not if yes then add it to the scan object ***-
    if (category) {
      scan.category = category;
    }

    
    const View = await productModel.find(scan);

    // *** Return the response ***
    return res.status(200).json({
      message: "File Fetched Successfully",
      View,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}


//Get a single product by it's if//
export const getProductbyId = async(req,res)=>{
     try {   
        // ***getting id***
        const {id} = req.params

        const View = await productModel.findOne({_id:id})
        
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
export const updateProductController = async (req, res) => {
  try {
    //getting id
    const { id } = req.params;

    //getting data
    const { description, name,price,category} = req.body;


    const files = req.files;
       //Validation of the fields below
        if (!description||!name||!price||!category) {
            return res.status(400).json({ message: "All fields are required" });
        }


    
    const existingDoc = await productModel.findOne({
        _id: id,
        user: req.user.email 
    });
    let imageRecords = existingDoc.image; 

    
    if (files && files.length > 0) {
     
      await Promise.all(existingDoc.image.map((img) => Delete_file(img.fileId)));

      // 2. Update the new images
      const Transfer = await Promise.all(
        files.map((elem) => Upload_files(elem.buffer, elem.originalname))
      );

      // 3. Update the imageRecords
      imageRecords = Transfer.map((elem) => ({
        url: elem.url,
        fileId: elem.fileId
      }));
    }

    // *** Update the document in the database ***
    const Update = await productModel.findByIdAndUpdate(
      id,
      {
        category,
        price,
        description,
        name,
        image: imageRecords, 
      },
      { new: true }
    );
    //Return the response//
    return res.status(200).json({
      message: "File Updated Successfully",
      Update,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

//delete product controller Delete by id//
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get the product from the database
   const existingDoc = await productModel.findOne({
    _id: id,
    user: req.user.email
});
    if (!existingDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    //Delete the images
    if (existingDoc.image && existingDoc.image.length > 0) {
      await Promise.all(
        existingDoc.image.map((img) => Delete_file(img.fileId))
      );
    }

    //now deleting the product from database
    const Delete = await productModel.findByIdAndDelete(id);
    
    // *** Return the response ***
    return res.status(200).json({
      message: "File and Data Deleted Successfully",
      Delete,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}