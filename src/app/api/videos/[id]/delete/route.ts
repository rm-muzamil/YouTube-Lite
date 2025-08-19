import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // adjust path
// import connect from "@/lib/db";
import Video from "@/models/Video";
import { connect } from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connect()
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const video = await Video.findById(params.id);

        if (!video) {
            return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
        }

        // 👇 Convert both sides to strings
        if (video.owner.toString() !== session.user.id) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        await video.deleteOne();

        return new Response(JSON.stringify({ message: "Video deleted successfully" }), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
