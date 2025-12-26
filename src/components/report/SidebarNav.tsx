"use client";

import React from "react";

export type NavItem = {
  id: string;
  label: string;
  required?: boolean;
};

export function SidebarNav({
  items,
  title = "Report sections",
  pinnedCountById,
  topLinks,
}: {
  items: NavItem[];
  title?: string;
  pinnedCountById?: Record<string, number>;
  topLinks?: React.ReactNode;
}) {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-20 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs font-semibold text-gray-700">{title}</div>
        </div>

        {topLinks ? <div className="mt-3">{topLinks}</div> : null}

        <nav className="mt-3 space-y-1">
          {items.map((it) => {
            const pinnedCount = pinnedCountById?.[it.id] ?? 0;

            return (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="min-w-0 truncate">
                  {it.label}
                  {it.required ? <span className="ml-2 text-xs text-gray-400">*</span> : null}
                </span>

                {pinnedCount > 0 ? (
                  <span className="shrink-0 rounded-full border bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                    {pinnedCount}
                  </span>
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="mt-3 text-xs text-gray-500">
          Tip: Use the sidebar to navigate quickly. Sections appear only if data exists.
        </div>
      </div>
    </aside>
  );
}
