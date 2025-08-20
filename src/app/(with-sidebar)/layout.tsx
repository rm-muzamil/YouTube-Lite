"use client";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function WithSidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div>
      <Navbar videos={videos} />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
