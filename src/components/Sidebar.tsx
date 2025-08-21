import React from "react";
import "@/app/globals.css";
import { SidebarOptions } from "../../services/Options";
import { usePathname } from "next/navigation";

function Sidebar() {
  const path = usePathname();
  return (
    <div className="w-[15rem]">
      <div className="bg-[var(--background)] fixed w-[15rem] h-screen p-[1rem]">
        {SidebarOptions.map((op, index) => (
          <div
            key={index}
            className={`h-[2.5rem] rounded-lg  flex items-center p-[1rem] ${
              op.path == path && "bg-gray-700 opacity-60"
            }`}
          >
            <h2>{op.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
