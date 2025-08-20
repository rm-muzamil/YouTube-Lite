"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function LoginButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (session) {
    return (
      <div className="relative" ref={menuRef}>
        {/* Avatar button */}
        <button onClick={() => setOpen(!open)}>
          <Image
            src={session.user?.image || "/default-avatar.png"}
            alt={session.user?.name || "User"}
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-3 z-50">
            <p className="font-semibold">{session.user?.name}</p>
            <p className="text-sm text-gray-500">{session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-2 w-full bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
    >
      Sign in
    </button>
  );
}
