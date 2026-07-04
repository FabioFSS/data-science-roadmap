import { DATA } from "../data/quarters.js";
import { ui } from "../uiState.js";
import { formatSeconds } from "../utils.js";
import { buildQuarterPageHtml } from "./quarter/template.js";
import { bindQuarterInteractions } from "./quarter/interactions.js";
import {
  getState,
  allTopicsFor,
  deadlineLabel,
  currentQuarterSeconds,
  isTimerActive,
} from "../state.js";

let tickInterval = null;

export function renderQuarterPage() {
  clearInterval(tickInterval);

  const state = getState();
  const q = DATA.find((d) => d.id === ui.activeQuarter);
  const main = document.getElementById("main");
  const topics = allTopicsFor(q);
  const deadlineVal = state.quarterDeadlines[q.id] || "";
  const dl = deadlineLabel(deadlineVal);
  const timerActive = isTimerActive(q.id);
  main.innerHTML = buildQuarterPageHtml({
    q,
    state,
    uiExpanded: ui.expanded,
    topics,
    deadlineVal,
    deadlineInfo: dl,
    timerActive,
    quarterSeconds: currentQuarterSeconds(q.id),
  });

  bindQuarterInteractions(q, timerActive);

  if (timerActive) {
    tickInterval = setInterval(() => {
      const el = document.getElementById("timeDisplay");
      if (el) el.textContent = formatSeconds(currentQuarterSeconds(q.id));
    }, 1000);
  }
}
