import { FLASHCARDS_DEFAULT, BOX_INTERVALS } from "../data/flashcards.js";
import { getState } from "./store.js";
import { persist, pushLog } from "./persistence.js";

function todayISO() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function addDaysISO(iso, days) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

export function allFlashcards() {
  const state = getState();
  const defaults = FLASHCARDS_DEFAULT.filter((c) => !state.removedCards.includes(c.id)).map((c) => {
    const edit = state.cardEdits[c.id];
    return { id: c.id, qid: c.qid, q: edit ? edit.q : c.q, a: edit ? edit.a : c.a, custom: false };
  });
  const custom = state.customCards.map((c) => ({ id: c.id, qid: c.qid, q: c.q, a: c.a, custom: true }));
  return defaults.concat(custom);
}

export function getCardProgress(id) {
  const state = getState();
  return state.cardProgress[id] || { box: 0, due: todayISO() };
}

export function cardsDueCount(filter) {
  const today = todayISO();
  return allFlashcards().filter((c) => (filter === "todos" || c.qid === filter) && getCardProgress(c.id).due <= today).length;
}

export function buildFlashQueue(filter, cram) {
  const today = todayISO();
  let cards = allFlashcards().filter((c) => filter === "todos" || c.qid === filter);
  if (!cram) cards = cards.filter((c) => getCardProgress(c.id).due <= today);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function gradeCard(cardId, questionText, grade) {
  const state = getState();
  const prog = getCardProgress(cardId);
  let box = prog.box;
  if (grade === "errei") box = 0;
  else if (grade === "facil") box = Math.min(box + 1, BOX_INTERVALS.length - 1);
  const due = addDaysISO(todayISO(), BOX_INTERVALS[box]);
  state.cardProgress[cardId] = { box, due };
  if (grade === "errei") pushLog("Revisão: errou — " + questionText.slice(0, 60));
  persist(true);
}

export function addFlashcard(qid, q, a) {
  const state = getState();
  if (!q.trim() || !a.trim()) return;
  state.customCards.push({ id: "custom-fc-" + Date.now(), qid, q: q.trim(), a: a.trim() });
  persist(true);
}

export function updateFlashcard(id, q, a) {
  const state = getState();
  const isDefault = FLASHCARDS_DEFAULT.some((c) => c.id === id);
  if (isDefault) state.cardEdits[id] = { q, a };
  else {
    const c = state.customCards.find((card) => card.id === id);
    if (c) {
      c.q = q;
      c.a = a;
    }
  }
  persist(true);
}

export function removeFlashcard(id) {
  const state = getState();
  const isDefault = FLASHCARDS_DEFAULT.some((c) => c.id === id);
  if (isDefault) {
    if (!state.removedCards.includes(id)) state.removedCards.push(id);
    delete state.cardEdits[id];
  } else {
    state.customCards = state.customCards.filter((c) => c.id !== id);
  }
  delete state.cardProgress[id];
  persist(true);
}
