import { DATA } from "../../data/quarters.js";
import { ui } from "../../uiState.js";
import { allFlashcards, getCardProgress, updateFlashcard, removeFlashcard } from "../../state.js";

export function renderFlashManageList() {
  const wrap = document.getElementById("flashManageList");
  if (!wrap) return;

  const q = ui.flashManageQuery.trim().toLowerCase();
  const cards = allFlashcards().filter((c) => !q || c.q.toLowerCase().includes(q) || c.a.toLowerCase().includes(q));

  if (cards.length === 0) {
    wrap.innerHTML = `<p class="empty-state">Nenhum cartão encontrado.</p>`;
    return;
  }

  wrap.innerHTML = cards
    .map((c) => {
      const quarter = DATA.find((d) => d.id === c.qid);
      const prog = getCardProgress(c.id);
      const isEditing = ui.flashEditingId === c.id;
      return `
      <div class="flash-card-row">
        <div class="flash-card-row-top">
          <div><p class="flash-card-q">${c.q}</p><p class="flash-card-a">${c.a}</p></div>
          <div class="flash-card-meta"><span class="flash-box-tag">${quarter ? quarter.label : "—"} · caixa ${prog.box} · próx. ${prog.due}</span></div>
        </div>
        <div class="my-course-foot">
          <span class="note-toggle" data-edit-card="${c.id}">${isEditing ? "Fechar" : "Editar"}</span>
          <button class="remove-link" data-remove-card="${c.id}">remover</button>
        </div>
        <div class="flash-edit-form ${isEditing ? "open" : ""}">
          <textarea id="editQ-${c.id}">${c.q}</textarea>
          <textarea id="editA-${c.id}">${c.a}</textarea>
          <div class="flash-edit-actions"><button class="btn primary" data-save-card="${c.id}">Salvar</button></div>
        </div>
      </div>`;
    })
    .join("");

  wrap.querySelectorAll("[data-edit-card]").forEach((el) =>
    el.addEventListener("click", () => {
      const cardId = el.getAttribute("data-edit-card");
      ui.flashEditingId = ui.flashEditingId === cardId ? null : cardId;
      renderFlashManageList();
    })
  );

  wrap.querySelectorAll("[data-save-card]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-save-card");
      updateFlashcard(id, document.getElementById("editQ-" + id).value, document.getElementById("editA-" + id).value);
      ui.flashEditingId = null;
      renderFlashManageList();
    });
  });

  wrap.querySelectorAll("[data-remove-card]").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeFlashcard(btn.getAttribute("data-remove-card"));
      renderFlashManageList();
    })
  );
}
