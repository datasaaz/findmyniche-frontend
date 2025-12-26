"use client";

import React, { useMemo, useState } from "react";
import { isObject, asArray, safeGet } from "./report-utils";
import { Section } from "../ui/Section";
import { CopyButton } from "../ui/CopyButton";

export function QueryToolkit({ ai }: { ai: any }) {
  const sq = useMemo(() => safeGet(ai, "search_queries"), [ai]);
  const tabs = useMemo(() => {
    if (!isObject(sq)) return [];
    return Object.keys(sq).filter((k) => k !== "industry_tags");
  }, [sq]);

  const industryTags = useMemo(() => asArray<string>(safeGet(ai, "search_queries.industry_tags")), [ai]);
  const [active, setActive] = useState<string>(tabs[0] ?? "google_search");

  if (!sq || (!tabs.length && !industryTags.length)) return null;

  const activeObj = (isObject(sq) && isObject((sq as any)[active]) ? (sq as any)[active] : {}) as any;

  const groups = Object.entries(activeObj)
    .filter(([_, v]) => Array.isArray(v))
    .map(([k, v]) => ({ key: k, values: asArray<string>(v) }));

  const allActiveTerms = groups.flatMap((g) => g.values);

  return (
    <Section
      id="queries"
      title="Search query toolkit"
      subtitle="Copy keywords and run independent research on Yelp, Google, Trends, Places, etc."
      actions={allActiveTerms.length ? <CopyButton text={allActiveTerms.join("\n")} label="Copy all" /> : null}
    >
      {tabs.length ? (
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                active === t ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setActive(t)}
              aria-pressed={active === t}
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-4 space-y-4">
        {groups.map((g) => (
          <div key={g.key} className="rounded-2xl border bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-semibold text-gray-700">{g.key}</div>
              {g.values.length ? <CopyButton text={g.values.join("\n")} label="Copy" /> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.values.map((term, i) => (
                <span key={i} className="rounded-full border bg-white px-3 py-1 text-xs">
                  {term}
                </span>
              ))}
            </div>
          </div>
        ))}

        {industryTags.length ? (
          <div className="rounded-2xl border bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-semibold text-gray-700">industry_tags</div>
              <CopyButton text={industryTags.join("\n")} label="Copy" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {industryTags.map((tag, i) => (
                <span key={i} className="rounded-full border bg-white px-3 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
