"use client";
import { useState } from "react";

interface Video {
  _id: string;
  title: string;
  videoURL: string;
  owner: any;
}

interface SearchBarProps {
  videos: Video[];
}

export default function SearchBar({ videos }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded-md"
      />
      {query && (
        <div className="absolute bg-white shadow-md rounded-md w-full mt-1 z-10">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div
                key={video._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {video.title}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
