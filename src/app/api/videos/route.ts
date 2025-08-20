import { connect } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect();

        const videos = await Video.find()
            .populate("owner", "name image") // 👈 populate uploader fields
            .sort({ createdAt: -1 });

        return NextResponse.json({ videos });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
