// app/videos/[id]/page.tsx
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/videos/${id}`)
      .then((res) => res.json())
      .then((data) => setVideo(data.video));
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <div className="p-6">
        <video
          autoPlay
          controls
          className="w-full max-w-4xl rounded-lg shadow-lg"
          src={video.videoURL}
        />
        <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
        <p className="text-gray-600 mt-2">{video.description}</p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <Image
            src={video.owner?.image || "/default-avatar.png"}
            alt={video.owner?.name || "Uploader"}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold">{video.owner?.name}</h2>
            <p className="text-gray-500 text-sm">{video.owner?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
