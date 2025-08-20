"use client";
import React, { useState } from "react";
import LoginButton from "@/components/LoginButtton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

function Navbar({ videos }: { videos: any[] }) {
  return (
    <div className="flex items-center px-[2rem] justify-between bg-amber-800 ">
      <div>YouTube Lite</div>
      <div>
        <SearchBar videos={videos} />
      </div>

      <div>
        <LoginButton />
      </div>
    </div>
  );
}

export default Navbar;
