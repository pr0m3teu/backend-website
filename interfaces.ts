import { UUIDTypes } from "uuid";

export interface ProductInterface {
    name : String,
    price : Number,
    rating? : Number,
    category? : [String],
    sizes : [String],
    description? : String,
    stock: Number,
    productId: UUIDTypes | any
};