import { GLOSSARY } from "../data/glossary.js";
import { ui } from "../uiState.js";

function renderList(filtered) {
  return filtered.length
    ? filtered.map((g) => `<div class="gterm"><div class="gname">${g.term}</div><div class="gdef">${g.def}</div></div>`).join("")
    : `<p class="empty-state">Nenhum termo encontrado para "${ui.glossaryQuery}".</p>`;
}

export function renderGlossary() {
  const main = document.getElementById("main");
  const q = ui.glossaryQuery.trim().toLowerCase();
  const filtered = GLOSSARY.filter((g) => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));

  main.innerHTML = `
    <div class="qheader">
      <div class="eyebrow">Referência</div>
      <h2>Glossário</h2>
      <p class="why">Termos técnicos usados ao longo do roadmap, para consultar rapidamente sem precisar sair do app.</p>
    </div>
    <input type="text" class="glossary-search" id="glossarySearch" placeholder="Buscar termo (ex: RAG, LoRA, atenção)..." value="${ui.glossaryQuery.replace(/"/g, "&quot;")}">
    <div id="glossaryList">${renderList(filtered)}</div>
  `;

  const searchInput = document.getElementById("glossarySearch");
  searchInput.addEventListener("input", (e) => {
    ui.glossaryQuery = e.target.value;
    const q2 = ui.glossaryQuery.trim().toLowerCase();
    const filtered2 = GLOSSARY.filter((g) => !q2 || g.term.toLowerCase().includes(q2) || g.def.toLowerCase().includes(q2));
    document.getElementById("glossaryList").innerHTML = renderList(filtered2);
  });
  searchInput.focus();
  searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
}
