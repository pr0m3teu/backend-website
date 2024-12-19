import mongoose, {Schema} from "mongoose";
import { UserInterface } from "../interfaces";

// TODO: Add view on users to hide sensitive data
const userSchema = new Schema<UserInterface>({
    email: { type : String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    
    admin: {type: Boolean, required: true, default: false },

}, 
{ 
    timestamps: true 
});

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;