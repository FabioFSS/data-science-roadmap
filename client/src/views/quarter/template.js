import { formatSeconds } from "../../utils.js";
import { topicProgress } from "../../state.js";

function buildTopicsHtml(q, topics, state) {
  return topics
    .map((topic, ti) => {
      const tkey = `${q.id}-${ti}`;
      const isOpen = !!state.uiExpanded[tkey];
      const prog = topicProgress(q.id, ti, topic);
      const topicNote = state.topicNotes[tkey] || "";
      const hasTopicNote = topicNote.trim().length > 0;

      const subsHtml = topic.subtopics
        .map((s, si) => {
          const skey = `${q.id}-${ti}-${si}`;
          const entry = state.subtopics[skey] || { done: false, notes: "" };
          const hasNote = entry.notes && entry.notes.trim().length > 0;
          const links = s.links || [];
          const linksHtml = links.length
            ? `<div class="sub-links">${links
                .map(
                  (l) =>
                    `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.name}</a><span class="res-tag ${l.type}">${l.type === "free" ? "gratuito" : l.type === "paid" ? "pago" : "gratuito/pago"}</span>`
                )
                .join("")}</div>`
            : "";
          return `
        <div class="subtopic ${entry.done ? "done" : ""}" data-key="${skey}">
          <div class="sub-check" data-action="toggle"></div>
          <div class="sub-body">
            <div class="sub-title">${s.title}</div>
            ${linksHtml}
            <div class="note-toggle ${hasNote ? "has-note" : ""}" data-action="note-toggle">✎ ${hasNote ? "ver anotação" : "adicionar anotação"}</div>
            <textarea class="note-box" placeholder="Sua anotação sobre este subtópico...">${entry.notes || ""}</textarea>
          </div>
        </div>`;
        })
        .join("");

      return `
      <div class="topic ${isOpen ? "expanded" : ""}" data-tkey="${tkey}">
        <div class="topic-header" data-action="toggle-topic">
          <div class="chevron">▶</div>
          <div class="topic-title">${topic.title}${topic.custom ? " · adicionado por você" : ""}</div>
          <div class="topic-progress">
            <div class="mini-bar"><div class="mini-bar-fill" style="width:${prog.pct}%"></div></div>
            ${prog.done}/${prog.total}
          </div>
          ${topic.custom ? `<button class="remove-link" data-remove-topic="${topic.customIndex}">remover</button>` : ""}
        </div>
        <div class="topic-body">
          ${subsHtml}
          <div class="topic-note-wrap">
            <div class="note-toggle ${hasTopicNote ? "has-note" : ""}" data-action="topic-note-toggle">✎ ${hasTopicNote ? "ver nota geral do tópico" : "adicionar nota geral do tópico"}</div>
            <textarea class="note-box" data-action="topic-note-box" placeholder="Observações gerais sobre este tópico...">${topicNote}</textarea>
          </div>
        </div>
      </div>`;
    })
    .join("");
}

export function buildQuarterPageHtml({ q, state, uiExpanded, topics, deadlineVal, deadlineInfo, timerActive, quarterSeconds }) {
  const hasTime = (state.studyTime[q.id] || 0) > 0 || timerActive;
  const viewState = { ...state, uiExpanded };
  const topicsHtml = buildTopicsHtml(q, topics, viewState);

  return `
    <div class="qheader">
      <div class="eyebrow">${q.label} · ${q.subtitle}</div>
      <h2>${q.title}</h2>
      <p class="why">${q.why}</p>
    </div>

    <div class="qmeta">
      <div class="qmeta-box">
        <div class="label">Prazo alvo</div>
        <div class="qmeta-row">
          <input type="date" id="deadlineInput" value="${deadlineVal}">
          ${deadlineVal ? `<span class="deadline-text ${deadlineInfo.cls}">${deadlineInfo.text}</span>` : `<span class="deadline-text">sem prazo definido</span>`}
        </div>
      </div>
      <div class="qmeta-box">
        <div class="label">Tempo de estudo neste trimestre</div>
        <div class="qmeta-row">
          <span class="time-display" id="timeDisplay">${formatSeconds(quarterSeconds)}</span>
          <button class="btn ${timerActive ? "primary" : ""}" id="timerToggleBtn">${timerActive ? "⏸ Pausar" : "▶ Iniciar sessão"}</button>
          <button class="btn" id="manualTimeBtn">+ manual</button>
          ${hasTime ? `<button class="btn" id="resetTimeBtn">Zerar</button>` : ""}
        </div>
      </div>
    </div>

    <div class="section-label">Tópicos</div>
    ${topicsHtml}
    <div class="add-row">
      <input type="text" id="newTopicInput" placeholder="Adicionar um tópico que surgiu no seu caminho...">
      <button id="addTopicBtn">Adicionar</button>
    </div>

    <div class="section-label">Recursos e cursos sugeridos</div>
    <ul class="resources">
      ${q.resources
        .map(
          (r) => `
        <li>
          <a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.name}</a>
          <span class="res-tag ${r.type}">${r.type === "free" ? "gratuito" : r.type === "paid" ? "pago" : "gratuito/pago"}</span>
        </li>`
        )
        .join("")}
    </ul>
    <p class="res-note">Catálogos de cursos e URLs mudam com o tempo — se algum link não abrir, busque pelo nome do curso/recurso diretamente na plataforma.</p>

    <div class="section-label">Entregável prático</div>
    <div class="deliverable">
      <div class="deliverable-label">Projeto do trimestre</div>
      <p>${q.deliverable}</p>
    </div>

    <div class="quarter-notes">
      <div class="section-label">Anotações gerais do trimestre</div>
      <textarea id="quarterNoteBox" placeholder="Reflexões, dúvidas, links, ideias para aplicar na bebook...">${state.quarterNotes[q.id] || ""}</textarea>
      <div class="save-hint" id="saveHint">as alterações salvam automaticamente</div>
    </div>
  `;
}
