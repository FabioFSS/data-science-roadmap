import { marked } from "marked";
import DOMPurify from "dompurify";
import { ui } from "../uiState.js";
import { render } from "../app.js";
import { bindConfirmButton } from "../utils.js";
import { apiUploadImage, apiDeleteImage } from "../api.js";
import {
  getMyCourse,
  cycleMyCourseStatus,
  updateMyCourseContent,
  addMyCourseImage,
  removeMyCourseImage,
  MY_COURSE_STATUS_LABEL,
} from "../state.js";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  textarea.value = `${before}${text}${after}`;
  const caret = start + text.length;
  textarea.selectionStart = textarea.selectionEnd = caret;
  textarea.dispatchEvent(new Event("input"));
  textarea.focus();
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function renderCoursePage() {
  const course = getMyCourse(ui.activeCourseId);
  const main = document.getElementById("main");

  if (!course) {
    main.innerHTML = `
      <div class="qheader">
        <div class="eyebrow">Referência</div>
        <h2>Curso não encontrado</h2>
        <p class="why">Este curso pode ter sido removido. Volte para a lista de cursos.</p>
      </div>
      <button class="btn" id="backToCertBtn">← Voltar para certificações e cursos</button>
    `;
    document.getElementById("backToCertBtn").addEventListener("click", () => {
      ui.view = "cert";
      render();
    });
    return;
  }

  const images = course.images || [];
  const content = course.content || "";
  const mode = ui.courseMode === "preview" ? "preview" : "edit";
  const previewHtml = content.trim()
    ? DOMPurify.sanitize(marked.parse(content))
    : `<p class="markdown-empty">Sem conteúdo ainda — mude para "Editar" e comece a escrever.</p>`;

  main.innerHTML = `
    <button class="btn" id="backToCertBtn">← Voltar para certificações e cursos</button>

    <div class="qheader course-header">
      <div class="eyebrow">Página do curso</div>
      <h2>${course.name}</h2>
      <div class="course-meta-row">
        ${course.provider ? `<span class="my-course-provider">${course.provider}</span>` : ""}
        ${course.url ? `<a href="${course.url}" target="_blank" rel="noopener noreferrer">Abrir curso ↗</a>` : ""}
        <button class="status-pill ${course.status}" id="courseStatusBtn">${MY_COURSE_STATUS_LABEL[course.status]}</button>
      </div>
    </div>

    <div class="course-tabs">
      <button class="course-tab ${mode === "edit" ? "active" : ""}" data-course-mode="edit">Editar</button>
      <button class="course-tab ${mode === "preview" ? "active" : ""}" data-course-mode="preview">Visualizar</button>
      ${mode === "edit" ? `<button class="btn" id="addImageBtn">📷 Adicionar imagem</button>` : ""}
      <input type="file" id="courseImageInput" accept="image/png,image/jpeg,image/gif,image/webp" style="display:none;">
      <span class="course-upload-status" id="courseUploadStatus"></span>
    </div>

    ${
      mode === "edit"
        ? `<textarea id="courseContentBox" class="course-editor" placeholder="Anotações gerais, resumo dos módulos, trechos importantes... suporta Markdown.">${content}</textarea>`
        : `<div class="markdown-body">${previewHtml}</div>`
    }

    ${
      images.length
        ? `<div class="section-label">Imagens salvas</div>
           <div class="course-image-gallery">
             ${images
               .map(
                 (img) => `
               <div class="course-image-thumb" data-filename="${img.filename}">
                 <img src="${img.url}" alt="${img.name || ""}">
                 <div class="course-image-actions">
                   <button class="thumb-insert" data-insert-image="${img.filename}" title="Inserir no texto">➕</button>
                   <button class="thumb-remove" data-remove-image="${img.filename}" title="Remover imagem">remover</button>
                 </div>
               </div>`
               )
               .join("")}
           </div>`
        : ""
    }
  `;

  document.getElementById("backToCertBtn").addEventListener("click", () => {
    ui.view = "cert";
    render();
  });

  document.getElementById("courseStatusBtn").addEventListener("click", () => {
    cycleMyCourseStatus(course.id);
    render();
  });

  main.querySelectorAll("[data-course-mode]").forEach((btn) =>
    btn.addEventListener("click", () => {
      ui.courseMode = btn.getAttribute("data-course-mode");
      render();
    })
  );

  const contentBox = document.getElementById("courseContentBox");
  if (contentBox) {
    contentBox.addEventListener("input", (e) => updateMyCourseContent(course.id, e.target.value));
  }

  const imageInput = document.getElementById("courseImageInput");
  const addImageBtn = document.getElementById("addImageBtn");
  const uploadStatus = document.getElementById("courseUploadStatus");
  if (addImageBtn) addImageBtn.addEventListener("click", () => imageInput.click());
  if (imageInput) {
    imageInput.addEventListener("change", async () => {
      const file = imageInput.files && imageInput.files[0];
      imageInput.value = "";
      if (!file) return;
      if (file.size > MAX_IMAGE_BYTES) {
        alert("Imagem maior que o limite de 8MB.");
        return;
      }
      uploadStatus.textContent = "Enviando imagem...";
      try {
        const dataUrl = await fileToDataUrl(file);
        const { filename, url } = await apiUploadImage({ courseId: course.id, dataUrl });
        addMyCourseImage(course.id, { filename, url, name: file.name });
        if (contentBox) insertAtCursor(contentBox, `\n![${file.name}](${url})\n`);
        render();
      } catch (err) {
        alert(err.message || "Falha ao enviar imagem.");
        uploadStatus.textContent = "";
      }
    });
  }

  main.querySelectorAll("[data-insert-image]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const img = images.find((i) => i.filename === btn.getAttribute("data-insert-image"));
      if (img && contentBox) insertAtCursor(contentBox, `\n![${img.name || ""}](${img.url})\n`);
    })
  );

  main.querySelectorAll("[data-remove-image]").forEach((btn) => {
    bindConfirmButton(btn, "Confirmar remover?", async () => {
      const filename = btn.getAttribute("data-remove-image");
      try {
        await apiDeleteImage(filename);
      } catch (err) {
        // arquivo pode já não existir no disco; segue removendo da lista mesmo assim
      }
      removeMyCourseImage(course.id, filename);
      render();
    });
  });
}
