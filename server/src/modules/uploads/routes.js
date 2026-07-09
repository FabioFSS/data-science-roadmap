const express = require("express");
const { saveUpload, deleteUpload } = require("../../repositories/uploadsRepository");

const router = express.Router();

router.post("/uploads", (req, res) => {
  const { courseId, dataUrl } = req.body || {};
  if (!dataUrl) return res.status(400).json({ error: "dataUrl é obrigatório." });
  try {
    const result = saveUpload({ courseId, dataUrl });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Falha ao salvar imagem." });
  }
});

router.delete("/uploads/:filename", (req, res) => {
  try {
    deleteUpload(req.params.filename);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message || "Falha ao remover imagem." });
  }
});

module.exports = router;
