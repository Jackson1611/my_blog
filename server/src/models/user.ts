import { Schema, model } from "mongoose";
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        select:false
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    role: {
        type: String,
        required: true
    }
},
{ timestamps: true });

export default model<IUser>("User", UserSchema);
