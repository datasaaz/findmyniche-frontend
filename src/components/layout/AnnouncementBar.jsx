import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnnouncement } from "../../utils/api";

export function AnnouncementBar() {
  const location = useLocation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["announcement"],
    queryFn: getAnnouncement,
    enabled: location.pathname === "/",
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && location.pathname === "/") {
      setVisible(true);
    }
  }, [isLoading, location.pathname]);

  // Only visible on the first Landing page (root path)
  // if (location.pathname !== "/") {
  //   return null;
  // }

  if (isLoading) return null;

  const announcementText = data?.announcement || "Find My Niche app will be live soon.";

  return (
    <div
      className={`bg-dark text-white py-4 px-6 relative z-40 mt-[64px] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-[20px] font-semibold text-center">
          {isError ? "" : announcementText}
        </p>
      </div>
    </div>
  );
}
