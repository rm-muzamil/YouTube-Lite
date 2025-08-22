// app/api/videos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect"; // your MongoDB connection utility
import Video from "@/models/Video";
import { connect } from "@/lib/db";
interface Params {
    params: {
        id: string;
    };
}

export async function GET(
    req: NextRequest, context: any
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
