"use client";
import React, { useState } from "react";
import LoginButton from "@/components/LoginButtton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import "@/app/globals.css";

function Navbar({ videos }: { videos: any[] }) {
  return (
    <div className="h-[3rem]">
      <div className="flex fixed z-10 w-full h-[4rem] items-center px-[2rem] justify-between bg-[var(--background)] opacity-70">
        <div>YouTube Lite</div>
        <div>
          <SearchBar videos={videos} />
        </div>

        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
