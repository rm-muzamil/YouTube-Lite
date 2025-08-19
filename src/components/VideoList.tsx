"use client";

import { useEffect, useState } from "react";

export default function VideoList() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos));
  }, []);

  return (
    <div className="grid gap-4">
      {videos.map((video) => (
        <div key={video._id} className="border p-2 rounded">
          <h2 className="font-semibold">{video.title}</h2>
          <video controls width="400">
            <source src={video.videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
