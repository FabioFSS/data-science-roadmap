const path = require("path");

const PORT = process.env.PORT || 8080;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "..", "data");
const CLIENT_DIST = path.join(__dirname, "..", "..", "..", "client", "dist");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

module.exports = {
  PORT,
  DATA_DIR,
  CLIENT_DIST,
  UPLOADS_DIR,
};
