"use client";
import Navbar from "@/components/Navbar";
import Provider from "@/app/Provider";
import "@/app/globals.css";
import { useEffect, useState } from "react";
// app/videos/[id]/layout.tsx
export default function VideoDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [videos, setVideos] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/videos/user-videos") // API returns only current user's videos
      .then((res) => res.json())
      .then((data) => {
        console.log("Api data.videos: ", data);
        setVideos(data || []);
      });
  }, []);
  return (
    <Provider>
      <Navbar videos={videos} />
      {/* Navbar is already included by parent RootLayout */}
      <main className="p-6">{children}</main>
    </Provider>
  );
}
