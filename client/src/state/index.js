export { DEFAULT_STATE } from "./defaults.js";
export { getState, replaceState, resetState } from "./store.js";
export { persist, loadState, pushLog } from "./persistence.js";

export {
  allTopicsFor,
  addCustomTopic,
  removeCustomTopic,
  topicProgress,
  quarterProgress,
  overallProgress,
  toggleSubtopic,
  setSubtopicNote,
  setTopicNote,
  setQuarterNote,
  setQuarterDeadline,
  daysUntil,
  deadlineLabel,
} from "./topics.js";

export {
  isTimerActive,
  currentQuarterSeconds,
  totalStudySeconds,
  startTimer,
  pauseTimer,
  addManualTime,
  resetStudyTime,
  flushTimerOnExit,
} from "./timer.js";

export { getCompletionDates, computeStreak, last14DaysCounts, totalProgressCounts } from "./stats.js";

export {
  allFlashcards,
  getCardProgress,
  cardsDueCount,
  buildFlashQueue,
  gradeCard,
  addFlashcard,
  updateFlashcard,
  removeFlashcard,
} from "./flashcards.js";

export {
  MY_COURSE_STATUS_ORDER,
  MY_COURSE_STATUS_LABEL,
  addMyCourse,
  cycleMyCourseStatus,
  updateMyCourseNote,
  removeMyCourse,
} from "./courses.js";
