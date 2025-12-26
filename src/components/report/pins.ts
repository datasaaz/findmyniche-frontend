"use client";

export type PinnedAction = {
  id: string; // stable client id
  text: string;
  confidence?: string | null;
  linked_gap?: string | null;
};

function keyFor(reportId: number) {
  return `pinned_actions_report_${reportId}`;
}

export function loadPinnedActions(reportId: number): PinnedAction[] {
  try {
    const raw = window.localStorage.getItem(keyFor(reportId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x && typeof x.id === "string" && typeof x.text === "string");
  } catch {
    return [];
  }
}

export function savePinnedActions(reportId: number, actions: PinnedAction[]) {
  try {
    window.localStorage.setItem(keyFor(reportId), JSON.stringify(actions));
  } catch {
    // ignore
  }
}

export function isPinned(reportId: number, actionId: string): boolean {
  return loadPinnedActions(reportId).some((a) => a.id === actionId);
}

export function togglePinnedAction(reportId: number, action: PinnedAction): PinnedAction[] {
  const current = loadPinnedActions(reportId);
  const exists = current.some((a) => a.id === action.id);
  const next = exists ? current.filter((a) => a.id !== action.id) : [action, ...current];
  savePinnedActions(reportId, next);
  return next;
}

export function removePinnedAction(reportId: number, actionId: string): PinnedAction[] {
  const current = loadPinnedActions(reportId);
  const next = current.filter((a) => a.id !== actionId);
  savePinnedActions(reportId, next);
  return next;
}
