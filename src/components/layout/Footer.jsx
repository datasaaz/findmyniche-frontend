import React from "react";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Our Data", path: "/data" },
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
    <footer className="bg-[#1a1a1a] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo (Left) */}
        <div className="flex items-center gap-2">
          <div onClick={() => navigate('/')} className="w-8 h-8 bg-essence rounded-lg flex items-center justify-center cursor-pointer">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">findmyniche</span>
        </div>

        {/* Links and Copyright (Right) */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[16px] font-semibold text-gray-100 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-[15px] text-gray-100">
              Copyright © 2026 Find My Niche. All rights reserved.
            </p>
            <button className=" cursor-pointer text-[15px] font-semibold text-gray-100 hover:text-gray-300 transition-colors  underline-offset-4">
              Manage Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
