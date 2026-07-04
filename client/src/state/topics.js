import { DATA } from "../data/quarters.js";
import { getState } from "./store.js";
import { persist, pushLog } from "./persistence.js";

export function allTopicsFor(q) {
  const state = getState();
  const custom = (state.customTopics[q.id] || []).map((c, i) => ({
    title: c.title,
    subtopics: [{ title: "Conteúdo definido por você — use a anotação para detalhar", links: [] }],
    custom: true,
    customIndex: i,
  }));
  return q.topics.concat(custom);
}

export function addCustomTopic(qid, title) {
  const state = getState();
  if (!title.trim()) return;
  if (!state.customTopics[qid]) state.customTopics[qid] = [];
  state.customTopics[qid].push({ title: title.trim() });
  pushLog(`Tópico adicionado em ${qid.toUpperCase()}: ${title.trim()}`);
  persist(true);
}

export function removeCustomTopic(qid, idx) {
  const state = getState();
  const q = DATA.find((d) => d.id === qid);
  const baseLen = q.topics.length;
  const ti = baseLen + idx;
  const topic = allTopicsFor(q)[ti];
  if (topic) topic.subtopics.forEach((_, si) => delete state.subtopics[`${qid}-${ti}-${si}`]);
  delete state.topicNotes[`${qid}-${ti}`];
  state.customTopics[qid].splice(idx, 1);
  persist(true);
}

export function topicProgress(qid, topicIdx, topic) {
  const state = getState();
  const total = topic.subtopics.length;
  let done = 0;
  topic.subtopics.forEach((_, si) => {
    if (state.subtopics[`${qid}-${topicIdx}-${si}`]?.done) done++;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function quarterProgress(q) {
  const state = getState();
  const topics = allTopicsFor(q);
  let done = 0,
    total = 0;
  topics.forEach((topic, ti) => {
    total += topic.subtopics.length;
    topic.subtopics.forEach((_, si) => {
      if (state.subtopics[`${q.id}-${ti}-${si}`]?.done) done++;
    });
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function overallProgress() {
  let done = 0,
    total = 0;
  DATA.forEach((q) => {
    const p = quarterProgress(q);
    done += p.done;
    total += p.total;
  });
  return total ? Math.round((done / total) * 100) : 0;
}

export function toggleSubtopic(key, subtopicTitle, quarterLabel) {
  const state = getState();
  const entry = state.subtopics[key] || { done: false, notes: "" };
  entry.done = !entry.done;
  entry.completedAt = entry.done ? new Date().toISOString() : null;
  state.subtopics[key] = entry;
  if (entry.done) pushLog(`${quarterLabel}: concluiu "${subtopicTitle}"`);
  persist(true);
}

export function setSubtopicNote(key, value) {
  const state = getState();
  state.subtopics[key] = state.subtopics[key] || { done: false, notes: "" };
  state.subtopics[key].notes = value;
  persist(true);
}

export function setTopicNote(key, value) {
  const state = getState();
  state.topicNotes[key] = value;
  persist(true);
}

export function setQuarterNote(qid, value) {
  const state = getState();
  state.quarterNotes[qid] = value;
  persist(true);
}

export function setQuarterDeadline(qid, value) {
  const state = getState();
  state.quarterDeadlines[qid] = value;
  persist(true);
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
}

export function deadlineLabel(dateStr) {
  const d = daysUntil(dateStr);
  if (d === null) return { text: "sem prazo definido", cls: "" };
  if (d < 0) return { text: `atrasado há ${Math.abs(d)} dia(s)`, cls: "overdue" };
  if (d === 0) return { text: "prazo é hoje", cls: "soon" };
  if (d <= 14) return { text: `faltam ${d} dia(s)`, cls: "soon" };
  return { text: `faltam ${d} dia(s)`, cls: "" };
}
