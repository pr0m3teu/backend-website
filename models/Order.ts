import mongoose, { Schema } from "mongoose";
import { OrderInterface } from "../interfaces";

const OrderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const OrderSchema = new Schema<OrderInterface>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },

    products: [OrderItemSchema],
    fullfiled: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
});

const Order = mongoose.model<OrderInterface>("Order", OrderSchema);

export default Order;