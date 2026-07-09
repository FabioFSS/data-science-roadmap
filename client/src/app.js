import { ui } from "./uiState.js";
import { renderSidebar } from "./views/sidebar.js";
import { renderQuarterPage } from "./views/quarterView.js";
import { renderCertifications } from "./views/certificationsView.js";
import { renderFlashcardsPage } from "./views/flashcardsView.js";
import { renderGlossary } from "./views/glossaryView.js";
import { renderStats } from "./views/statsView.js";
import { renderDataPage } from "./views/dataView.js";
import { renderCoursePage } from "./views/courseView.js";

export function render() {
  renderSidebar();
  if (ui.view === "cert") renderCertifications();
  else if (ui.view === "course") renderCoursePage();
  else if (ui.view === "flashcards") renderFlashcardsPage();
  else if (ui.view === "glossary") renderGlossary();
  else if (ui.view === "stats") renderStats();
  else if (ui.view === "data") renderDataPage();
  else renderQuarterPage();
}
