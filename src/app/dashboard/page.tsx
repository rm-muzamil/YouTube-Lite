"use client";

import VideoList from "@/components/VideoList";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/videos/user-videos") // API returns only current user's videos
      .then((res) => res.json())
      .then((data) => {
        console.log("Api data.videos: ", data);
        setVideos(data || []);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/videos/${id}/delete`, { method: "DELETE" });
    setVideos((prev) => prev.filter((v) => v._id !== id));
  };

  return (
    <div className="grid gap-4">
      {videos.map((video) => (
        <div key={video._id} className="border p-2 rounded">
          <h2>{video.title}</h2>
          <video controls width="400">
            <source src={video.videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex gap-2 mt-2">
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              Edit
            </button>
            <button
              onClick={() => handleDelete(video._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
