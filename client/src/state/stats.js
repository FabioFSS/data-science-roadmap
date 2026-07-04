import { DATA } from "../data/quarters.js";
import { getState } from "./store.js";
import { quarterProgress } from "./topics.js";

export function getCompletionDates() {
  const state = getState();
  const dates = [];
  Object.values(state.subtopics).forEach((entry) => {
    if (entry?.done && entry.completedAt) dates.push(entry.completedAt.slice(0, 10));
  });
  return dates;
}

export function computeStreak(dateStrings) {
  const uniqueDays = new Set(dateStrings);
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  const todayStr = cursor.toISOString().slice(0, 10);
  if (!uniqueDays.has(todayStr)) cursor.setDate(cursor.getDate() - 1);
  while (true) {
    const str = cursor.toISOString().slice(0, 10);
    if (uniqueDays.has(str)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}

export function last14DaysCounts(dateStrings) {
  const counts = {};
  dateStrings.forEach((d) => (counts[d] = (counts[d] || 0) + 1));
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const str = d.toISOString().slice(0, 10);
    days.push({
      date: str,
      count: counts[str] || 0,
      label: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
    });
  }
  return days;
}

export function totalProgressCounts() {
  let done = 0;
  let total = 0;
  DATA.forEach((q) => {
    const p = quarterProgress(q);
    done += p.done;
    total += p.total;
  });
  return { done, total };
}
