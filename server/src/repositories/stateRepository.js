const fs = require("fs");
const path = require("path");
const { DATA_DIR } = require("../config/env");

const DATA_FILE = path.join(DATA_DIR, "state.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readState() {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) return null;
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Falha ao ler o arquivo de estado, tratando como inexistente:", err);
    return null;
  }
}

function writeState(state) {
  ensureDataDir();
  const tmpFile = DATA_FILE + ".tmp";
  fs.writeFileSync(tmpFile, JSON.stringify(state, null, 2), "utf-8");
  fs.renameSync(tmpFile, DATA_FILE);
}

module.exports = {
  readState,
  writeState,
  DATA_FILE,
};
