import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connect } from "@/lib/db";
import Video from "@/models/Video";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connect();
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const { id } = params;

        const video = await Video.findById(id);

        if (!video) {
            return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
        }

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
