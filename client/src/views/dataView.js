import { DATA } from "../data/quarters.js";
import { downloadFile, bindConfirmButton } from "../utils.js";
import { formatSeconds } from "../utils.js";
import { render } from "../app.js";
import { getState, replaceState, resetState, allTopicsFor, quarterProgress, overallProgress, MY_COURSE_STATUS_LABEL, persist } from "../state.js";

function buildMarkdownExport() {
  const state = getState();
  let md = `# Roadmap — IA/LLMs para Cientista de Dados Sênior\n\n`;
  md += `Progresso geral: ${overallProgress()}% · Exportado em ${new Date().toLocaleDateString("pt-BR")}\n\n`;

  if (state.myCourses.length) {
    md += `## Meus cursos\n\n`;
    state.myCourses.forEach((c) => {
      md += `- [${c.status === "concluido" ? "x" : " "}] ${c.name}${c.provider ? " — " + c.provider : ""} (${MY_COURSE_STATUS_LABEL[c.status]})\n`;
      if (c.notes && c.notes.trim()) md += `  - Nota: ${c.notes.trim()}\n`;
    });
    md += `\n---\n\n`;
  }

  DATA.forEach((q) => {
    const prog = quarterProgress(q);
    md += `## ${q.label} — ${q.title} (${prog.done}/${prog.total} · ${prog.pct}%)\n\n`;
    if (state.quarterDeadlines[q.id]) md += `Prazo alvo: ${state.quarterDeadlines[q.id]}\n\n`;
    if (state.studyTime[q.id]) md += `Tempo de estudo: ${formatSeconds(state.studyTime[q.id])}\n\n`;
    allTopicsFor(q).forEach((topic, ti) => {
      md += `### ${topic.title}\n\n`;
      topic.subtopics.forEach((s, si) => {
        const key = `${q.id}-${ti}-${si}`;
        const entry = state.subtopics[key] || {};
        md += `- [${entry.done ? "x" : " "}] ${s.title}\n`;
        if (s.links && s.links.length) s.links.forEach((l) => (md += `  - [${l.name}](${l.url})\n`));
        if (entry.notes && entry.notes.trim()) md += `  - Nota: ${entry.notes.trim()}\n`;
      });
      const tnote = state.topicNotes[`${q.id}-${ti}`];
      if (tnote && tnote.trim()) md += `\n> Nota geral do tópico: ${tnote.trim()}\n`;
      md += `\n`;
    });
    md += `**Entregável:** ${q.deliverable}\n\n`;
    const qnote = state.quarterNotes[q.id];
    if (qnote && qnote.trim()) md += `**Anotações gerais do trimestre:** ${qnote.trim()}\n\n`;
    md += `---\n\n`;
  });

  return md;
}

function exportMarkdown() {
  downloadFile("roadmap-progresso.md", buildMarkdownExport(), "text/markdown");
}

function exportPDF() {
  const state = getState();
  const printArea = document.getElementById("printArea");
  let html = `<h1>Roadmap — IA/LLMs para Cientista de Dados Sênior</h1>`;
  html += `<div class="pitem">Progresso geral: ${overallProgress()}% · Exportado em ${new Date().toLocaleDateString("pt-BR")}</div>`;
  DATA.forEach((q) => {
    const prog = quarterProgress(q);
    html += `<h2>${q.label} — ${q.title} (${prog.done}/${prog.total} · ${prog.pct}%)</h2>`;
    allTopicsFor(q).forEach((topic, ti) => {
      html += `<h3>${topic.title}</h3>`;
      topic.subtopics.forEach((s, si) => {
        const key = `${q.id}-${ti}-${si}`;
        const entry = state.subtopics[key] || {};
        html += `<div class="pitem ${entry.done ? "pdone" : "ppending"}">${s.title}</div>`;
        if (entry.notes && entry.notes.trim())
          html += `<div style="font-size:11.5px;color:#555;margin:2px 0 6px 18px;">Nota: ${entry.notes.trim()}</div>`;
      });
    });
    html += `<div class="pitem"><strong>Entregável:</strong> ${q.deliverable}</div>`;
  });
  printArea.innerHTML = html;
  document.body.classList.add("printing");
  window.print();
}
window.addEventListener("afterprint", () => document.body.classList.remove("printing"));

function exportBackup() {
  downloadFile("roadmap-backup.json", JSON.stringify(getState(), null, 2), "application/json");
}

function importBackup(file, statusEl) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      replaceState(imported);
      persist(true);
      if (statusEl) statusEl.textContent = "Backup importado com sucesso.";
      render();
    } catch (err) {
      if (statusEl) statusEl.textContent = "Não foi possível ler este arquivo. Verifique se é um backup JSON válido gerado por este app.";
    }
  };
  reader.readAsText(file);
}

export function renderDataPage() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="qheader">
      <div class="eyebrow">Progresso</div>
      <h2>Dados e backup</h2>
      <p class="why">O progresso fica salvo no servidor (arquivo em disco), então qualquer dispositivo na sua rede local acessa o mesmo estado. Ainda assim, vale ter uma cópia própria de tempos em tempos — principalmente antes de atualizar o container.</p>
    </div>

    <div class="data-section">
      <h3>Exportar progresso</h3>
      <p>Gera um arquivo com todo o seu progresso, cursos, anotações e entregáveis.</p>
      <div class="data-actions">
        <button class="btn primary" id="exportMdBtn">⬇ Exportar em Markdown</button>
        <button class="btn" id="exportPdfBtn">🖨 Exportar em PDF</button>
      </div>
    </div>

    <div class="data-section">
      <h3>Backup completo (JSON)</h3>
      <p>Guarda tudo (progresso, notas, prazos, tempo de estudo, cursos, cartões) num arquivo restaurável, inclusive em outro dispositivo ou após reinstalar o container.</p>
      <div class="data-actions">
        <button class="btn" id="exportJsonBtn">⬇ Exportar backup</button>
        <button class="btn" id="importJsonBtn">⬆ Importar backup</button>
        <input type="file" id="importFileInput" accept="application/json">
      </div>
      <div class="import-status" id="importStatus"></div>
    </div>

    <div class="data-section">
      <h3>Reiniciar progresso</h3>
      <p>Apaga tudo e começa do zero. Essa ação não pode ser desfeita — exporte um backup antes se tiver dúvida.</p>
      <div class="data-actions"><button class="btn danger" id="resetBtn">Reiniciar tudo</button></div>
    </div>
  `;

  document.getElementById("exportMdBtn").addEventListener("click", exportMarkdown);
  document.getElementById("exportPdfBtn").addEventListener("click", exportPDF);
  document.getElementById("exportJsonBtn").addEventListener("click", exportBackup);
  document.getElementById("importJsonBtn").addEventListener("click", () => document.getElementById("importFileInput").click());
  document.getElementById("importFileInput").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) importBackup(e.target.files[0], document.getElementById("importStatus"));
  });
  bindConfirmButton(document.getElementById("resetBtn"), "Confirmar: apagar tudo?", () => {
    resetState();
    persist(true);
    render();
  });
}
