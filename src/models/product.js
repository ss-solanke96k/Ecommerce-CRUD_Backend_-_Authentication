import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
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

    user:{
        type: String,
    }

},{
    timestamps:true,
});

const productModel = mongoose.model('product',productSchema);

export default productModel;