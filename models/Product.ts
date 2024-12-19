import mongoose, { Schema } from "mongoose";
import {v4 as uuid} from "uuid";
import { ProductInterface } from "../interfaces";

// TODO: Add Images
const productSchema = new Schema<ProductInterface>({
    name: { type: String, required: true },
    price: { type: Number, required: true},
    rating: Number,
    category: [{ type: String, required: false }],
    sizes: [{ type: String, required: true }],
    description: String,
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    
    productId: {
        type: 'UUID',
        required: true, 
        default: () => uuid()
    
    },

},
{
    timestamps: true
});

const Product = mongoose.model<ProductInterface>("Product", productSchema);

export default Product;