import React from "react";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";

export function Footer() {
  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Support", path: "/support" },
    { name: "Status", path: "/status" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy", path: "/privacy" },
    { name: "Press", path: "/press" },
    { name: "Cookies", path: "/cookies" },
    { name: "Security", path: "/security" },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo (Left) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-essence rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">findmyniche</span>
        </div>

        {/* Links and Copyright (Right) */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-[12px] text-gray-500">
              Copyright © 2026 Find My Niche. All rights reserved.
            </p>
            <button className="text-[12px] text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4">
              Manage Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
