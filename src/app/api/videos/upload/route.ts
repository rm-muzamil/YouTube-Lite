// // src/app/api/videos/upload/route.ts
// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { connect } from "@/lib/db";
// import Video from "@/models/Video";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: Request) {
//     try {
//         await connect();

//         const session = await getServerSession(authOptions);
//         if (!session) {
//             return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//         }

//         const formData = await req.formData();
//         const file = formData.get("file") as File;
//         const title = formData.get("title") as string;
//         const description = formData.get("description") as string;

//         if (!file || !title || !description) {
//             return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//         }

//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         const uploadRes: any = await new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//                 { resource_type: "video", folder: "videos" },
//                 (error, result) => {
//                     if (error) reject(error);
//                     else resolve(result);
//                 }
//             );
//             stream.end(buffer);
//         });

//         // ✅ Now pass required fields to Mongoose
//         const newVideo = await Video.create({
//             title,
//             description,
//             videoURL: uploadRes.secure_url,
//             publicId: uploadRes.public_id,
//             owner: (session as any).user.id, // logged-in user ID
//         });

//         return NextResponse.json(newVideo, { status: 201 });
//     } catch (error) {
//         console.error("Upload error:", error);
//         return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//     }
// }

// src/app/api/videos/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connect } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
    try {
        await connect();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        if (!file || !title || !description) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        // Convert file to buffer for Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // ✅ Upload video to Cloudinary
        const uploadRes: any = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "video", folder: "videos" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        // ✅ Call Python microservice for thumbnail generation
        let thumbnailUrl: string | null = null;
        try {
            const thumbRes = await fetch(
                process.env.THUMBNAIL_SERVICE_URL || "http://127.0.0.1:8000/generate-thumbnail/",
                {
                    method: "POST",
                    body: JSON.stringify({ videoUrl: uploadRes.secure_url }),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (thumbRes.ok) {
                // Microservice returns a direct image URL or base64 thumbnail
                const data = await thumbRes.json();
                thumbnailUrl = data.thumbnailUrl;
            }
        } catch (err) {
            console.error("Thumbnail service failed:", err);
        }

        // ✅ Save video details in MongoDB
        const newVideo = await Video.create({
            title,
            description,
            videoURL: uploadRes.secure_url,
            publicId: uploadRes.public_id,
            thumbnail: thumbnailUrl, // store AI-generated thumbnail
            owner: (session as any).user.id,
        });

        return NextResponse.json(newVideo, { status: 201 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
