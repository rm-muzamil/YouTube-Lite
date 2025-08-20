// app/api/videos/[id]/route.ts
import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect"; // your MongoDB connection utility
import Video from "@/models/Video";
import { connect } from "@/lib/db";

export async function GET(
    req: Request,
    context: { params: { id: string } }
) {
    try {
        await connect()
        const { id } = context.params;

        const video = await Video.findById(id).populate("owner", "name email image")

        if (!video) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }


        return NextResponse.json({ video }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
