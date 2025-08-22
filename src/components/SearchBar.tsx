"use client";
import { useState } from "react";

interface Video {
  _id: string;
  title: string;
  videoURL: string;
  owner: any;
}

interface SearchBarProps {
  videos?: Video[]; // optional to avoid TS error
}

export default function SearchBar({ videos = [] }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const filteredVideos = Array.isArray(videos)
    ? videos.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

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
          {filteredVideos.map((video) => (
            <div key={video._id}>{video.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}
