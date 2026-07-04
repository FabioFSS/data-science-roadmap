import { ui } from "../uiState.js";
import { apiSetState } from "../api.js";
import { DATA } from "../data/quarters.js";
import { getState } from "./store.js";
import { persist } from "./persistence.js";

function flushActiveTimer() {
  if (!ui.timer) return;
  const state = getState();
  const elapsed = (Date.now() - ui.timer.startedAt) / 1000;
  state.studyTime[ui.timer.qid] = (state.studyTime[ui.timer.qid] || 0) + elapsed;
}

let autoCommitHandle = null;

export function isTimerActive(qid) {
  return !!(ui.timer && ui.timer.qid === qid);
}

export function currentQuarterSeconds(qid) {
  const state = getState();
  let sec = state.studyTime[qid] || 0;
  if (isTimerActive(qid)) sec += (Date.now() - ui.timer.startedAt) / 1000;
  return sec;
}

export function totalStudySeconds() {
  const state = getState();
  let sec = 0;
  DATA.forEach((q) => (sec += state.studyTime[q.id] || 0));
  if (ui.timer) sec += (Date.now() - ui.timer.startedAt) / 1000;
  return sec;
}

export function startTimer(qid) {
  if (ui.timer) flushActiveTimer();
  ui.timer = { qid, startedAt: Date.now() };
  clearTimeout(autoCommitHandle);

  const autoCommit = () => {
    if (ui.timer && ui.timer.qid === qid) {
      flushActiveTimer();
      ui.timer.startedAt = Date.now();
      persist(false);
      autoCommitHandle = setTimeout(autoCommit, 30000);
    }
  };

  autoCommitHandle = setTimeout(autoCommit, 30000);
}

export function pauseTimer() {
  if (!ui.timer) return;
  flushActiveTimer();
  ui.timer = null;
  clearTimeout(autoCommitHandle);
  persist(true);
}

export function addManualTime(qid, minutes) {
  const state = getState();
  state.studyTime[qid] = (state.studyTime[qid] || 0) + minutes * 60;
  persist(true);
}

export function resetStudyTime(qid) {
  const state = getState();
  if (isTimerActive(qid)) {
    ui.timer = null;
    clearTimeout(autoCommitHandle);
  }
  state.studyTime[qid] = 0;
  persist(true);
}

export function flushTimerOnExit() {
  if (ui.timer) {
    flushActiveTimer();
    apiSetState(getState()).catch(() => {});
  }
}
