import { DATA } from "../data/quarters.js";
import { getState, quarterProgress, overallProgress, deadlineLabel } from "../state.js";
import { ui } from "../uiState.js";
import { render } from "../app.js";

export function renderSidebar() {
  const state = getState();
  const list = document.getElementById("qlist");
  list.innerHTML = "";

  DATA.forEach((q) => {
    const prog = quarterProgress(q);
    const dl = deadlineLabel(state.quarterDeadlines[q.id]);
    const li = document.createElement("li");
    li.className =
      "qnode" +
      (ui.view === "quarter" && q.id === ui.activeQuarter ? " active" : "") +
      (prog.pct === 100 ? " done" : prog.pct > 0 ? " inprogress" : "");
    li.innerHTML = `
      <div class="qid">${q.label}</div>
      <div class="qtitle">${q.title}</div>
      <div class="qpct">
        <span>${prog.done}/${prog.total} · ${prog.pct}%</span>
        ${state.quarterDeadlines[q.id] ? `<span class="qdeadline ${dl.cls}">${dl.text}</span>` : ""}
      </div>`;
    li.addEventListener("click", () => {
      ui.view = "quarter";
      ui.activeQuarter = q.id;
      render();
      window.scrollTo(0, 0);
    });
    list.appendChild(li);
  });

  const navMap = {
    certNavItem: "cert",
    flashNavItem: "flashcards",
    glossaryNavItem: "glossary",
    statsNavItem: "stats",
    dataNavItem: "data",
  };
  Object.entries(navMap).forEach(([elId, view]) => {
    const el = document.getElementById(elId);
    el.className = "nav-item" + (ui.view === view ? " active" : "");
    el.onclick = () => {
      ui.view = view;
      render();
      window.scrollTo(0, 0);
    };
  });

  const pct = overallProgress();
  document.getElementById("overallPct").textContent = pct + "%";
  document.getElementById("overallBar").style.width = pct + "%";
}
