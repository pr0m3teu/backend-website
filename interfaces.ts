import { UUIDTypes } from "uuid";

export interface ProductInterface {
    name : string,
    price : Number,
    rating? : Number,
    category? : [string],
    sizes : [string],
    description? : string,
    stock: Number,
    productId: UUIDTypes | any
};

export interface UserInterface {
    username: string,
    password: string,
    dateCreatedAt: Date,
    firstName: string,
    lastName: string
};