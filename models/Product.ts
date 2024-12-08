import mongoose, { Schema } from "mongoose";
import {v4 as uuid} from "uuid";

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true},
    rating: Number,
    category: { type: String, required: false },
    sizes: [{ type: String, required: true }],
    description: String,

    productId: {
        type: 'UUID', 
        required: true, 
        default: () => uuid()
    
    },
    
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;