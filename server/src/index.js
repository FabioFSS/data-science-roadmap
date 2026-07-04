const { createApp } = require("./app");
const { PORT } = require("./config/env");

const app = createApp();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Roadmap Tracker rodando em http://0.0.0.0:${PORT}`);
  console.log(`Acesse pela rede local usando o IP da máquina, ex: http://192.168.x.x:${PORT}`);
});
