const express = require("express");
const path = require("path");
const stateRoutes = require("./modules/state/routes");
const { CLIENT_DIST } = require("./config/env");

function createApp() {
  const app = express();

  app.use(express.json({ limit: "2mb" }));
  app.use("/api", stateRoutes);
  app.use(express.static(CLIENT_DIST));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });

  return app;
}

module.exports = {
  createApp,
};
