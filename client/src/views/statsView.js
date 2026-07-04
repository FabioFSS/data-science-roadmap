import { DATA } from "../data/quarters.js";
import { formatSeconds } from "../utils.js";
import {
  getState,
  quarterProgress,
  overallProgress,
  getCompletionDates,
  computeStreak,
  last14DaysCounts,
  totalStudySeconds,
  allFlashcards,
  cardsDueCount,
} from "../state.js";

export function renderStats() {
  const main = document.getElementById("main");
  const state = getState();
  const dates = getCompletionDates();
  const streak = computeStreak(dates);
  const days = last14DaysCounts(dates);
  const maxCount = Math.max(1, ...days.map((d) => d.count));
  const overall = overallProgress();

  let totalDone = 0,
    totalItems = 0;
  DATA.forEach((q) => {
    const p = quarterProgress(q);
    totalDone += p.done;
    totalItems += p.total;
  });

  const coursesInProgress = state.myCourses.filter((c) => c.status === "fazendo").length;
  const coursesDone = state.myCourses.filter((c) => c.status === "concluido").length;
  const totalCards = allFlashcards().length;
  const dueToday = cardsDueCount("todos");

  const barsHtml = days
    .map((d) => {
      const h = Math.round((d.count / maxCount) * 80) + (d.count > 0 ? 6 : 2);
      return `
      <div style="display:flex; flex-direction:column; align-items:center; gap:6px; flex:1;">
        <div style="width:100%; max-width:20px; height:90px; display:flex; align-items:flex-end;">
          <div style="width:100%; height:${h}px; background:${d.count > 0 ? "var(--teal)" : "var(--surface-3)"}; border-radius:3px 3px 0 0;"></div>
        </div>
        <div style="font-family:var(--font-display); font-size:9px; color:var(--text-faint);">${d.label}</div>
      </div>`;
    })
    .join("");

  main.innerHTML = `
    <div class="qheader">
      <div class="eyebrow">Progresso</div>
      <h2>Estatísticas</h2>
      <p class="why">Uma visão rápida de constância e volume de estudo — útil para perceber cedo se o ritmo está sustentável ou se algum trimestre precisa de mais tempo.</p>
    </div>

    <div class="stat-grid">
      <div class="stat-card"><div class="stat-label">Sequência atual</div><div class="stat-value accent">${streak} dia${streak === 1 ? "" : "s"}</div></div>
      <div class="stat-card"><div class="stat-label">Progresso geral</div><div class="stat-value">${overall}%</div></div>
      <div class="stat-card"><div class="stat-label">Subtópicos concluídos</div><div class="stat-value">${totalDone}/${totalItems}</div></div>
      <div class="stat-card"><div class="stat-label">Tempo total de estudo</div><div class="stat-value">${formatSeconds(totalStudySeconds())}</div></div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-label">Cursos em andamento</div><div class="stat-value">${coursesInProgress}</div></div>
      <div class="stat-card"><div class="stat-label">Cursos concluídos</div><div class="stat-value">${coursesDone}</div></div>
      <div class="stat-card"><div class="stat-label">Cartões cadastrados</div><div class="stat-value">${totalCards}</div></div>
      <div class="stat-card"><div class="stat-label">Cartões para revisar hoje</div><div class="stat-value accent">${dueToday}</div></div>
    </div>

    <div class="chart-wrap">
      <div class="chart-title">Itens concluídos nos últimos 14 dias</div>
      <div style="display:flex; gap:6px; align-items:flex-end;">${barsHtml}</div>
    </div>

    <div class="chart-wrap">
      <div class="chart-title">Progresso por trimestre</div>
      ${DATA.map((q) => {
        const p = quarterProgress(q);
        return `<div class="chart-row"><div class="chart-label">${q.label} · ${q.title}</div><div class="chart-bar-bg"><div class="chart-bar-fill" style="width:${p.pct}%"></div></div><div class="chart-pct">${p.pct}%</div></div>`;
      }).join("")}
    </div>

    <div class="section-label">Atividade recente</div>
    <ul class="recent-list">
      ${
        state.log.length
          ? state.log
              .slice(0, 10)
              .map((l) => `<li><span>${l.text}</span><span class="rdate">${new Date(l.ts).toLocaleDateString("pt-BR")}</span></li>`)
              .join("")
          : `<li class="empty-state">Nenhuma atividade registrada ainda.</li>`
      }
    </ul>
  `;
}
