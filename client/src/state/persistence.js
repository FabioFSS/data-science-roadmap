import { apiGetState, apiSetState } from "../api.js";
import { getState, replaceState } from "./store.js";

let saveTimer = null;

export function persist(showHint) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await apiSetState(getState());
      setStorageNote("Salvo no servidor ✓");
      if (showHint) flashSaveHint();
    } catch (err) {
      console.error("Falha ao salvar progresso", err);
      setStorageNote("Não foi possível salvar — verifique a conexão com o servidor.");
    }
  }, 300);
}

function flashSaveHint() {
  const hint = document.getElementById("saveHint");
  if (!hint) return;
  hint.textContent = "salvo ✓";
  hint.classList.add("show");
  setTimeout(() => {
    if (hint) {
      hint.classList.remove("show");
      hint.textContent = "as alterações salvam automaticamente";
    }
  }, 1200);
}

function setStorageNote(text) {
  const el = document.getElementById("storageNote");
  if (el) el.textContent = text;
}

export async function loadState() {
  try {
    const res = await apiGetState();
    if (res) replaceState(res);
    setStorageNote("Conectado ao servidor.");
  } catch (err) {
    console.error(err);
    setStorageNote("Não foi possível conectar ao servidor — verifique se o container está rodando.");
  }
}

export function pushLog(text) {
  const state = getState();
  state.log.unshift({ ts: Date.now(), text });
  state.log = state.log.slice(0, 30);
}
