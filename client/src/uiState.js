// Estado de UI puramente transitório — nunca é salvo no servidor.
// Fica num objeto mutável exportado (em vez de variáveis soltas) para que
// qualquer módulo possa alterar campos individuais sem precisar de setters
// específicos para cada um.
import { DATA } from "./data/quarters.js";

export const ui = {
  view: "quarter", // "quarter" | "cert" | "flashcards" | "glossary" | "stats" | "data"
  activeQuarter: DATA[0].id,
  expanded: {}, // tkey -> bool, controla quais tópicos estão abertos
  certFilter: "all",
  glossaryQuery: "",
  timer: null, // { qid, startedAt } | null
  flashDomainFilter: "todos",
  flashQueue: [],
  flashIndex: 0,
  flashShowAnswer: false,
  flashCramMode: false,
  flashManageQuery: "",
  flashEditingId: null,
};
