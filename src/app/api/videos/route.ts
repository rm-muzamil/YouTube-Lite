import { connect } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect()
        const videos = await Video.find().sort({ createdAt: -1 });
        return NextResponse.json({ videos });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
