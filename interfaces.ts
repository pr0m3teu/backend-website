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
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    admin: boolean,
    dateCreatedAt: Date,
};

export interface AddressInterface extends Document {
    city: string,
    street: string,
    houseNumber: string | number,
    country: string,
    postalCode: number,
    phoneNumber: string,
    user: Schema.Types.ObjectId,
    dateCreatedAt: Date,  
};

export interface OrderInterface extends Document {
    userId: Schema.Types.ObjectId,
    address: Schema.Types.ObjectId,
    products: [Schema.Types.ObjectId],
    fullfiled: boolean
}