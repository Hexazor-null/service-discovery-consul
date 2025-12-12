const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3001;
const SERVICE_NAME = "server-a";
const CONSUL = "http://consul:8500";

async function registerToConsul(retry = 0) {
  try {
    await axios.put(`${CONSUL}/v1/agent/service/register`, {
      Name: SERVICE_NAME,
      ID: SERVICE_NAME,
      Address: process.env.HOSTNAME, 
      Port: PORT,
      Check: {
        HTTP: `http://${process.env.HOSTNAME}:${PORT}/info`,
        Interval: "5s",
        Timeout: "2s"
      }
    });

    console.log(`[OK] Registered to Consul: ${SERVICE_NAME}`);
  } catch (err) {
    console.log(`[ERROR] Failed register ${SERVICE_NAME} (${retry}):`, err.message);
    setTimeout(() => registerToConsul(retry + 1), 2000);
  }
}

app.get("/info", (req, res) => {
  res.json({
    service: SERVICE_NAME,
    hostname: process.env.HOSTNAME,
    timestamp: Date.now()
  });
});

app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
  setTimeout(registerToConsul, 2000);
});
