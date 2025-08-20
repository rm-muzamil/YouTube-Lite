"use client";
import React from "react";
import { useState } from "react";
import VideoList from "@/components/VideoList";

function UploadVideo() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    const res = await fetch("/api/videos/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Video uploaded successfully!");
      setFile(null);
      setTitle("");
      setProgress(0);
    } else {
      alert("Upload failed!");
    }
  };
  return (
    <div>
      <div className="p-4 border rounded-lg">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Video description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-2"
        />
        {progress > 0 && <p>Uploading: {progress.toFixed(2)}%</p>}
        <button
          onClick={handleUpload}
          disabled={!file || !title}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadVideo;
