import "./styles.css";
import { loadState, flushTimerOnExit } from "./state.js";
import { render } from "./app.js";

window.addEventListener("beforeunload", flushTimerOnExit);

loadState().then(render);
