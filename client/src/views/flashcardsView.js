import { DATA } from "../data/quarters.js";
import { ui } from "../uiState.js";
import { render } from "../app.js";
import { renderFlashManageList } from "./flashcards/manageList.js";
import {
  allFlashcards,
  cardsDueCount,
  buildFlashQueue,
  gradeCard,
  addFlashcard,
} from "../state.js";

function startFlashReview() {
  let queue = buildFlashQueue(ui.flashDomainFilter, ui.flashCramMode);
  if (queue.length === 0 && !ui.flashCramMode) {
    ui.flashCramMode = true;
    queue = buildFlashQueue(ui.flashDomainFilter, true);
  }
  ui.flashQueue = queue;
  ui.flashIndex = 0;
  ui.flashShowAnswer = false;
  render();
}

export function renderFlashcardsPage() {
  const main = document.getElementById("main");
  const dueCount = cardsDueCount(ui.flashDomainFilter);
  const sessionActive = ui.flashQueue.length > 0 || (ui.flashIndex > 0 && ui.flashQueue.length === 0);

  let html = `
    <div class="qheader">
      <div class="eyebrow">Referência</div>
      <h2>Revisão (flashcards)</h2>
      <p class="why">Perguntas e respostas com repetição espaçada simples: cartões que você acerta voltam mais espaçados; os que você erra voltam logo.</p>
    </div>
    <div class="flash-toolbar">
      <select id="flashDomainSelect">
        <option value="todos" ${ui.flashDomainFilter === "todos" ? "selected" : ""}>Todos os trimestres</option>
        ${DATA.map((q) => `<option value="${q.id}" ${ui.flashDomainFilter === q.id ? "selected" : ""}>${q.label} · ${q.title}</option>`).join("")}
      </select>
      <label><input type="checkbox" id="flashCramCheckbox" ${ui.flashCramMode ? "checked" : ""}> revisar mesmo sem estar atrasado</label>
      <span class="flash-due-count">${dueCount} cartão(ões) para hoje</span>
    </div>
  `;

  if (!sessionActive) {
    const totalInFilter = allFlashcards().filter((c) => ui.flashDomainFilter === "todos" || c.qid === ui.flashDomainFilter).length;
    let msg;
    if (totalInFilter === 0) msg = "Nenhum cartão cadastrado ainda para esse filtro — adicione um abaixo.";
    else if (dueCount > 0 || ui.flashCramMode) msg = "Pronto para revisar?";
    else msg = "Nenhum cartão vencido para hoje com esse filtro. Iniciar revisão vai trazer todos os cartões para praticar mesmo assim.";
    html += `<div class="flash-empty"><p>${msg}</p>${totalInFilter > 0 ? `<button class="btn primary" id="startReviewBtn">Iniciar revisão</button>` : ""}</div>`;
  } else if (ui.flashIndex >= ui.flashQueue.length) {
    html += `<div class="flash-empty"><p>Sessão concluída — você revisou ${ui.flashQueue.length} cartão(ões).</p><button class="btn primary" id="startReviewBtn">Revisar de novo</button></div>`;
  } else {
    const card = ui.flashQueue[ui.flashIndex];
    const q = DATA.find((d) => d.id === card.qid);
    html += `
      <div class="flash-progress-label">Cartão ${ui.flashIndex + 1} de ${ui.flashQueue.length}</div>
      <div class="flash-card">
        <div class="flash-domain-tag">${q ? q.label + " · " + q.title : "Geral"}</div>
        <div class="flash-question">${card.q}</div>
        ${ui.flashShowAnswer ? `<div class="flash-answer">${card.a}</div>` : ""}
      </div>`;
    if (!ui.flashShowAnswer) {
      html += `<div class="flash-actions"><button class="btn primary" id="showAnswerBtn">Mostrar resposta</button></div>`;
    } else {
      html += `
      <div class="flash-actions">
        <button class="grade-btn errei" data-grade="errei">Errei</button>
        <button class="grade-btn dificil" data-grade="dificil">Difícil</button>
        <button class="grade-btn facil" data-grade="facil">Fácil</button>
      </div>`;
    }
  }

  html += `
    <div class="section-label">Gerenciar cartões</div>
    <input type="text" class="flash-manage-search" id="flashManageSearch" placeholder="Buscar por pergunta ou resposta..." value="${ui.flashManageQuery}">
    <div class="flash-add-form">
      <select id="newCardQid">${DATA.map((q) => `<option value="${q.id}">${q.label} · ${q.title}</option>`).join("")}</select>
      <input type="text" name="q" id="newCardQ" placeholder="Pergunta">
      <input type="text" name="a" id="newCardA" placeholder="Resposta">
      <button type="button" id="addCardBtn">Adicionar</button>
    </div>
    <div id="flashManageList"></div>
  `;

  main.innerHTML = html;

  document.getElementById("flashDomainSelect").addEventListener("change", (e) => {
    ui.flashDomainFilter = e.target.value;
    ui.flashQueue = [];
    ui.flashIndex = 0;
    render();
  });
  document.getElementById("flashCramCheckbox").addEventListener("change", (e) => {
    ui.flashCramMode = e.target.checked;
    ui.flashQueue = [];
    ui.flashIndex = 0;
    render();
  });
  const startBtn = document.getElementById("startReviewBtn");
  if (startBtn) startBtn.addEventListener("click", startFlashReview);
  const showBtn = document.getElementById("showAnswerBtn");
  if (showBtn)
    showBtn.addEventListener("click", () => {
      ui.flashShowAnswer = true;
      render();
    });

  main.querySelectorAll("[data-grade]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const card = ui.flashQueue[ui.flashIndex];
      gradeCard(card.id, card.q, btn.getAttribute("data-grade"));
      ui.flashIndex++;
      ui.flashShowAnswer = false;
      render();
    })
  );

  document.getElementById("flashManageSearch").addEventListener("input", (e) => {
    ui.flashManageQuery = e.target.value;
    renderFlashManageList();
  });
  document.getElementById("addCardBtn").addEventListener("click", () => {
    const qid = document.getElementById("newCardQid").value;
    const q = document.getElementById("newCardQ").value;
    const a = document.getElementById("newCardA").value;
    if (q.trim() && a.trim()) {
      addFlashcard(qid, q, a);
      render();
    }
  });

  renderFlashManageList();
}
