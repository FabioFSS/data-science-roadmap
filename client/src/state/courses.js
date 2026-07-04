import { getState } from "./store.js";
import { persist, pushLog } from "./persistence.js";

export const MY_COURSE_STATUS_ORDER = ["planejado", "fazendo", "concluido", "nao-concluido"];

export const MY_COURSE_STATUS_LABEL = {
  planejado: "Pretendo fazer",
  fazendo: "Fazendo agora",
  concluido: "Concluído",
  "nao-concluido": "Não concluí",
};

export function addMyCourse(data) {
  const state = getState();
  if (!data.name.trim()) return;
  state.myCourses.unshift({
    id: "course-" + Date.now(),
    name: data.name.trim(),
    provider: data.provider.trim(),
    url: data.url.trim(),
    status: "planejado",
    notes: "",
  });
  persist(true);
}

export function cycleMyCourseStatus(id) {
  const state = getState();
  const course = state.myCourses.find((c) => c.id === id);
  if (!course) return;
  const idx = MY_COURSE_STATUS_ORDER.indexOf(course.status);
  course.status = MY_COURSE_STATUS_ORDER[(idx + 1) % MY_COURSE_STATUS_ORDER.length];
  if (course.status === "concluido") pushLog("Curso concluído: " + course.name);
  if (course.status === "nao-concluido") pushLog("Curso não concluído: " + course.name);
  persist(true);
}

export function updateMyCourseNote(id, value) {
  const state = getState();
  const c = state.myCourses.find((course) => course.id === id);
  if (c) {
    c.notes = value;
    persist(true);
  }
}

export function removeMyCourse(id) {
  const state = getState();
  state.myCourses = state.myCourses.filter((c) => c.id !== id);
  persist(true);
}
