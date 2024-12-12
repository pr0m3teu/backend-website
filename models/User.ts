import mongoose, {Schema} from "mongoose";
import { UserInterface } from "../interfaces";

const userSchema = new Schema<UserInterface>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateCreatedAt: {type: Date, required: true, default: new Date()},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
});

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;