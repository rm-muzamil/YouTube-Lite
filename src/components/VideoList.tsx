"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VideoList() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video) => (
        <Link key={video._id} href={`/videos/${video._id}`}>
          <div className="cursor-pointer hover:scale-[1.02] transition-transform">
            {/* Thumbnail */}
            <div className="relative w-full h-48">
              <Image
                src={video.thumbnailURL || "/default-thumbnail.jpg"}
                alt={video.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Video Info */}
            <div className="flex mt-3 gap-3">
              {/* Uploader Avatar */}
              <Image
                src={video.owner?.image || "/default-avatar.png"}
                alt={video.owner?.name || "Uploader"}
                width={40}
                height={40}
                className="rounded-full"
              />

              {/* Title + Uploader */}
              <div>
                <h2 className="text-base font-semibold line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {video.owner?.name || "Unknown Uploader"}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
