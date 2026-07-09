const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { UPLOADS_DIR } = require("../config/env");

const MAX_BYTES = 8 * 1024 * 1024;
const MIME_EXT = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
};
const SAFE_FILENAME = /^[a-zA-Z0-9_-]+\.[a-z]{3,4}$/;

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

function saveUpload({ courseId, dataUrl }) {
  const match = /^data:(image\/[a-z]+);base64,(.+)$/.exec(dataUrl || "");
  if (!match) throw new Error("Formato de imagem inválido.");
  const [, mime, base64] = match;
  const ext = MIME_EXT[mime];
  if (!ext) throw new Error("Tipo de imagem não suportado (use PNG, JPEG, GIF ou WEBP).");

  const buffer = Buffer.from(base64, "base64");
  if (buffer.length > MAX_BYTES) throw new Error("Imagem maior que o limite de 8MB.");

  ensureUploadsDir();
  const safeCourseId = (courseId || "curso").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40) || "curso";
  const filename = `${safeCourseId}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer);

  return { filename, url: `/uploads/${filename}` };
}

function deleteUpload(filename) {
  if (!SAFE_FILENAME.test(filename || "")) throw new Error("Nome de arquivo inválido.");
  const filePath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

module.exports = {
  saveUpload,
  deleteUpload,
};
