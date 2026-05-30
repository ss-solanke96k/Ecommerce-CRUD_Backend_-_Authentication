import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Description is required"],
    },
    description:{
        type:String,
        required:[true, "Description is required"],
    },
    price:{
        type:Number,
        required:[true, "Description is required"],
    },
    category:{
        type:String,
        required:[true, "Description is required"],
    },
    image: [
        {
            url: { 
                type: String,
                required: true 
            },
            fileId: {
                type: String, 
                required: true 
            }
            
        }
        
    ],
},{
    timestamps:true,
});

const productModel = mongoose.model('product',productSchema);

export default productModel;