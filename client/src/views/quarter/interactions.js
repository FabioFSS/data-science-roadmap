import { ui } from "../../uiState.js";
import { render } from "../../app.js";
import { bindConfirmButton } from "../../utils.js";
import {
  addCustomTopic,
  removeCustomTopic,
  toggleSubtopic,
  setSubtopicNote,
  setTopicNote,
  setQuarterNote,
  setQuarterDeadline,
  startTimer,
  pauseTimer,
  addManualTime,
  resetStudyTime,
} from "../../state.js";

function bindQuarterMetaActions(q, timerActive) {
  document.getElementById("deadlineInput").addEventListener("change", (e) => {
    setQuarterDeadline(q.id, e.target.value);
    render();
  });

  document.getElementById("timerToggleBtn").addEventListener("click", () => {
    if (timerActive) pauseTimer();
    else startTimer(q.id);
    render();
  });

  document.getElementById("manualTimeBtn").addEventListener("click", () => {
    const input = prompt("Quantos minutos deseja adicionar a este trimestre?");
    if (input === null) return;
    const minutes = parseFloat(input.replace(",", "."));
    if (isNaN(minutes) || minutes <= 0) {
      alert("Digite um número válido de minutos.");
      return;
    }
    addManualTime(q.id, minutes);
    render();
  });

  const resetTimeBtn = document.getElementById("resetTimeBtn");
  if (resetTimeBtn) {
    bindConfirmButton(resetTimeBtn, "Confirmar zerar?", () => {
      resetStudyTime(q.id);
      render();
    });
  }
}

function bindTopicCreation(q) {
  document.getElementById("addTopicBtn").addEventListener("click", () => {
    const input = document.getElementById("newTopicInput");
    addCustomTopic(q.id, input.value);
    input.value = "";
    render();
  });

  document.getElementById("newTopicInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addCustomTopic(q.id, e.target.value);
      e.target.value = "";
      render();
    }
  });
}

function bindTopicInteractions(q, main) {
  main.querySelectorAll(".topic").forEach((topicEl) => {
    const tkey = topicEl.getAttribute("data-tkey");

    topicEl.querySelector('[data-action="toggle-topic"]').addEventListener("click", () => {
      ui.expanded[tkey] = !ui.expanded[tkey];
      render();
    });

    const topicNoteToggle = topicEl.querySelector('[data-action="topic-note-toggle"]');
    const topicNoteBox = topicEl.querySelector('[data-action="topic-note-box"]');
    if (topicNoteToggle && topicNoteBox) {
      topicNoteToggle.addEventListener("click", () => topicNoteBox.classList.toggle("open"));
      topicNoteBox.addEventListener("input", (e) => setTopicNote(tkey, e.target.value));
    }

    const removeTopicBtn = topicEl.querySelector("[data-remove-topic]");
    if (removeTopicBtn) {
      removeTopicBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        removeCustomTopic(q.id, parseInt(removeTopicBtn.getAttribute("data-remove-topic"), 10));
        render();
      });
    }

    topicEl.querySelectorAll(".subtopic").forEach((subEl) => {
      const skey = subEl.getAttribute("data-key");
      subEl.querySelector('[data-action="toggle"]').addEventListener("click", (ev) => {
        ev.stopPropagation();
        const title = subEl.querySelector(".sub-title").textContent;
        toggleSubtopic(skey, title, q.label);
        render();
      });

      const noteToggle = subEl.querySelector('[data-action="note-toggle"]');
      const noteBox = subEl.querySelector(".note-box");
      noteToggle.addEventListener("click", (ev) => {
        ev.stopPropagation();
        noteBox.classList.toggle("open");
      });
      noteBox.addEventListener("input", (e) => setSubtopicNote(skey, e.target.value));
      noteBox.addEventListener("click", (ev) => ev.stopPropagation());
    });
  });
}

function bindQuarterNotes(q) {
  document.getElementById("quarterNoteBox").addEventListener("input", (e) => setQuarterNote(q.id, e.target.value));
}

export function bindQuarterInteractions(q, timerActive) {
  const main = document.getElementById("main");
  bindQuarterMetaActions(q, timerActive);
  bindTopicCreation(q);
  bindTopicInteractions(q, main);
  bindQuarterNotes(q);
}
