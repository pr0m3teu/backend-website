import { AddressInterface } from "../interfaces";
import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema<AddressInterface>({
    city: {type : String, required: true},
    street: {type : String, required: true},
    houseNumber: {type : String, required: true},
    country: {type : String, required: true},
    postalCode: {type : Number, required: true},
    phoneNumber: {type: String, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
},
{
    timestamps: true
});

const Address = mongoose.model<AddressInterface>("Address", addressSchema);
export default Address;