import { CERTIFICATIONS } from "../data/certifications.js";
import { ui } from "../uiState.js";
import { render } from "../app.js";
import {
  getState,
  addMyCourse,
  cycleMyCourseStatus,
  updateMyCourseNote,
  removeMyCourse,
  MY_COURSE_STATUS_LABEL,
} from "../state.js";

export function renderCertifications() {
  const state = getState();
  const main = document.getElementById("main");
  const relLabel = { alta: "Alta relevância", media: "Relevância média", exploratoria: "Exploratória" };

  const categoriesHtml = CERTIFICATIONS.map((cat) => {
    const visibleItems = cat.items.filter((item) => ui.certFilter === "all" || item.relevance === ui.certFilter);
    if (visibleItems.length === 0) return "";
    return `
      <div class="cert-category">
        <h3>${cat.category}</h3>
        <div class="cat-note">${cat.note}</div>
        <ul class="cert-list">
          ${visibleItems
            .map(
              (item) => `
            <li>
              <div class="cert-row">
                <div class="cert-row-left">
                  <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a>
                  <span class="rel-tag ${item.relevance}">${relLabel[item.relevance]}</span>
                </div>
                <span class="res-tag ${item.type}">${item.type === "free" ? "gratuito" : item.type === "paid" ? "pago" : "gratuito/pago"}</span>
              </div>
              <div class="cert-provider">${item.provider}</div>
              <div class="cert-note">${item.note}</div>
            </li>`
            )
            .join("")}
        </ul>
      </div>`;
  }).join("");

  main.innerHTML = `
    <div class="qheader">
      <div class="eyebrow">Referência</div>
      <h2>Certificações e cursos</h2>
      <p class="why">Certificações não substituem o aprendizado prático do roadmap, mas ajudam a validar formalmente o conhecimento. A tag de relevância reflete a aderência ao seu contexto (bebook, GABI, Azure, Qlik).</p>
    </div>

    <div class="my-courses">
      <div class="section-label" style="margin-top:0;">Meus cursos</div>
      <p class="why" style="margin-bottom:14px;">Registre cursos que você está fazendo ou pretende fazer — não precisam estar na lista de referências abaixo.</p>
      <div class="add-course-form">
        <input type="text" name="name" id="courseNameInput" placeholder="Nome do curso">
        <input type="text" name="provider" id="courseProviderInput" placeholder="Instituição (opcional)">
        <input type="url" name="url" id="courseUrlInput" placeholder="Link (opcional)">
        <button type="button" id="addCourseBtn">Adicionar</button>
      </div>
      <div id="myCoursesList">
        ${
          state.myCourses.length
            ? state.myCourses
                .map(
                  (c) => `
          <div class="my-course-card">
            <div class="my-course-top">
              <div>
                ${c.url ? `<a class="my-course-name linked" href="${c.url}" target="_blank" rel="noopener">${c.name}</a>` : `<span class="my-course-name">${c.name}</span>`}
                ${c.provider ? `<div class="my-course-provider">${c.provider}</div>` : ""}
              </div>
              <button class="status-pill ${c.status}" data-course-status="${c.id}">${MY_COURSE_STATUS_LABEL[c.status]}</button>
            </div>
            <div class="my-course-foot">
              <button class="btn course-page-link" data-course-open="${c.id}">📝 Página do curso${c.content ? " ●" : ""}</button>
              <span class="note-toggle ${c.notes ? "has-note" : ""}" data-course-notetoggle="${c.id}">Anotação ${c.notes ? "●" : ""}</span>
              <button class="remove-link" data-course-remove="${c.id}">remover</button>
            </div>
            <textarea class="note-box ${c.notes ? "open" : ""}" data-course-notearea="${c.id}" placeholder="Progresso, módulo atual, impressões...">${c.notes || ""}</textarea>
          </div>
        `
                )
                .join("")
            : `<p class="my-course-empty">Nenhum curso registrado ainda — adicione acima o que você está fazendo ou pretende começar.</p>`
        }
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-chip ${ui.certFilter === "all" ? "active" : ""}" data-filter="all">Todas</div>
      <div class="filter-chip ${ui.certFilter === "alta" ? "active" : ""}" data-filter="alta">Alta relevância</div>
      <div class="filter-chip ${ui.certFilter === "media" ? "active" : ""}" data-filter="media">Relevância média</div>
      <div class="filter-chip ${ui.certFilter === "exploratoria" ? "active" : ""}" data-filter="exploratoria">Exploratória</div>
    </div>
    ${categoriesHtml || `<p class="empty-state">Nenhuma certificação nessa categoria de relevância.</p>`}
    <p class="res-note">Catálogos e nomes de certificações mudam com frequência — se um link não abrir, busque pelo nome do provedor diretamente.</p>
  `;

  function submitNewCourse() {
    const name = document.getElementById("courseNameInput").value;
    const provider = document.getElementById("courseProviderInput").value;
    const url = document.getElementById("courseUrlInput").value;
    addMyCourse({ name, provider, url });
    render();
  }
  document.getElementById("addCourseBtn").addEventListener("click", submitNewCourse);
  document.getElementById("courseNameInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitNewCourse();
  });

  main.querySelectorAll("[data-course-open]").forEach((btn) =>
    btn.addEventListener("click", () => {
      ui.view = "course";
      ui.activeCourseId = btn.getAttribute("data-course-open");
      render();
      window.scrollTo(0, 0);
    })
  );
  main.querySelectorAll("[data-course-status]").forEach((btn) =>
    btn.addEventListener("click", () => {
      cycleMyCourseStatus(btn.getAttribute("data-course-status"));
      render();
    })
  );
  main.querySelectorAll("[data-course-notetoggle]").forEach((el) => {
    el.addEventListener("click", () => {
      const area = main.querySelector(`[data-course-notearea="${el.getAttribute("data-course-notetoggle")}"]`);
      area.classList.toggle("open");
    });
  });
  main
    .querySelectorAll("[data-course-notearea]")
    .forEach((el) => el.addEventListener("input", (e) => updateMyCourseNote(el.getAttribute("data-course-notearea"), e.target.value)));
  main.querySelectorAll("[data-course-remove]").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeMyCourse(btn.getAttribute("data-course-remove"));
      render();
    })
  );
  main.querySelectorAll(".filter-chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      ui.certFilter = chip.getAttribute("data-filter");
      render();
    })
  );
}
