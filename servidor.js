const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let lastResult = null;

app.post("/api/result", (req, res) => {
  const { winner } = req.body;
  lastResult = winner;
  console.log(`Winner received: ${winner}`);
  res.sendStatus(200);
});

app.get("/api/result", (req, res) => {
  res.json({ winner: lastResult });
});

const PORT = 5000;
const os = require("os");

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
}

const localIP = getLocalIP();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://${localIP}:${PORT}`);
});