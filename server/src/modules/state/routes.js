const express = require("express");
const { readState, writeState } = require("../../repositories/stateRepository");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true });
});

router.get("/state", (req, res) => {
  const state = readState();
  if (state === null) {
    return res.status(404).json({ error: "Nenhum estado salvo ainda." });
  }
  res.json(state);
});

router.put("/state", (req, res) => {
  const body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Corpo da requisição inválido." });
  }
  try {
    writeState(body);
    res.json({ ok: true });
  } catch (err) {
    console.error("Falha ao salvar estado:", err);
    res.status(500).json({ error: "Falha ao salvar estado no servidor." });
  }
});

module.exports = router;
