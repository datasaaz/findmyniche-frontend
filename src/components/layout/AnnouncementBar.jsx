import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "../ui/utils";

export function AnnouncementBar() {
  const location = useLocation();
  
  // Only visible on the first Landing page (root path)
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="bg-dark text-white py-4 px-6 relative z-40 mt-[73px]">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-lg font-bold tracking-wide text-center">
          Find My Niche app will be live soon.
        </p>
      </div>
    </div>
  );
}
