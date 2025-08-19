// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    provider: string; // "google" | "credentials"
    createdAt: Date;
    username?: string;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: String,
        provider: { type: String, required: true },
        username: { type: String, sparse: true },
    },
    { timestamps: true }
);

export default mongoose.models.User ||
    mongoose.model<IUser>("User", UserSchema);
