import mongoose, {Schema} from "mongoose";
import { UserInterface } from "../interfaces";

const userSchema = new Schema<UserInterface>({
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type : String, required: true, unique: true },
    
    admin: {type: Boolean, required: true, default: false },
    dateCreatedAt: {type: Date, required: true, default: new Date()},
});

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;