import { UUIDTypes } from "uuid";
import { Document, Schema } from "mongoose";


export interface ProductInterface extends Document {
    name : string,
    price : Number,
    rating? : Number,
    category? : [string],
    sizes : [string],
    description? : string,
    stock: Number,
    productId: UUIDTypes | any
};

export interface UserInterface extends Document {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    dateCreatedAt: Date,
};

export interface AddressInterface extends Document {
    city: string,
    street: string,
    houseNumber: string | number,
    country: string,
    postalCode: number,
    user: Schema.Types.ObjectId,
    dateCreatedAt: Date,  
};