// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
    title: string;
    // description: string;
    thumbnail?: string;
    videoURL: string;
    owner: mongoose.Types.ObjectId;
    // likes: mongoose.Types.ObjectId[];
    uploadedAt: Date
}

const VideoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true },
        // description: { type: String, required: true },
        thumbnail: { type: String },
        videoURL: { type: String, required: true, unique: true },
        uploadedAt: { type: Date, default: Date.now() },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        // likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true }
);

export default mongoose.models.Video ||
    mongoose.model<IVideo>("Video", VideoSchema);
