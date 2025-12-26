"use client";

import React, { useEffect, useState } from "react";

export function CopyButton({
  text,
  className = "",
  label = "Copy",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 900);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      className={`rounded-xl border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50 ${className}`}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
