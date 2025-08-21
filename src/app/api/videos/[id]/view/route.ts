// import { connect } from "@/lib/db";
// import Video from "@/models/Video";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { NextResponse } from "next/server";

// export async function POST(req: Request, context: { params: { id: string } }) {
//     try {
//         await connect();
//         const { id } = context.params;

//         // Get logged-in user
//         const session = await getServerSession(authOptions);
//         if (!session?.user?.id) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         const video = await Video.findById(id);
//         if (!video) {
//             return NextResponse.json({ error: "Video not found" }, { status: 404 });
//         }

//         // Only increment if user hasn't viewed yet
//         if (!video.viewers.includes(session.user.id)) {
//             video.views += 1;
//             video.viewers.push(session.user.id);
//             await video.save();
//         }

//         return NextResponse.json({ message: "View counted", views: video.views });
//     } catch (err: any) {
//         return NextResponse.json({ error: err.message }, { status: 500 });
//     }
// }
// src/app/api/videos/[id]/view/route.ts
import { connect } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        await connect();

        const id = params?.id;
        if (!id) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const video = await Video.findById(id);
        if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

        // Initialize if missing
        if (!Array.isArray(video.viewers)) video.viewers = [];
        if (!video.views) video.views = 0;

        // Increment view once per user
        if (!video.viewers.includes(session.user.id)) {
            video.views += 1;
            video.viewers.push(session.user.id);
            await video.save();
        }

        return NextResponse.json({ views: video.views });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
