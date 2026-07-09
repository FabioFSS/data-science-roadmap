const express = require("express");
const path = require("path");
const stateRoutes = require("./modules/state/routes");
const uploadsRoutes = require("./modules/uploads/routes");
const { CLIENT_DIST, UPLOADS_DIR } = require("./config/env");

function createApp() {
  const app = express();

  app.use(express.json({ limit: "12mb" }));
  app.use("/api", stateRoutes);
  app.use("/api", uploadsRoutes);
  app.use("/uploads", express.static(UPLOADS_DIR));
  app.use(express.static(CLIENT_DIST));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });

  return app;
}

module.exports = {
  createApp,
};
