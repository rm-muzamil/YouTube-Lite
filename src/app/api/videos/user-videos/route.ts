import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connect } from "@/lib/db";
import Video from "@/models/Video";

export async function GET(req: Request) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // fetch only videos owned by the logged-in user
        const videos = await Video.find({ owner: session.user.id }).sort({ createdAt: -1 });

        return new Response(JSON.stringify(videos), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
