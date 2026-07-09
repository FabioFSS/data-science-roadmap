export const DEFAULT_STATE = {
  subtopics: {}, // key -> { done, notes, completedAt }
  topicNotes: {}, // tkey -> string
  quarterNotes: {}, // qid -> string
  quarterDeadlines: {}, // qid -> "YYYY-MM-DD"
  studyTime: {}, // qid -> segundos acumulados
  customTopics: {}, // qid -> [{ title }]
  myCourses: [], // [{ id, name, provider, url, status, notes, content, images: [{filename,url,name}] }]
  customCards: [], // [{ id, qid, q, a }]
  cardEdits: {}, // id (cartao padrao) -> { q, a }
  removedCards: [], // ids de cartoes padrao removidos
  cardProgress: {}, // id -> { box, due }
  log: [], // [{ ts, text }]
};
