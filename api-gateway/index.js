const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8080;

async function resolveService(service) {
    const name = `server-${service}`; // <-- mapping penting

    try {
        const res = await axios.get(
            `http://consul:8500/v1/catalog/service/${name}`
        );

        if (!res.data.length) {
            throw new Error(`Service ${name} not found`);
        }

        return {
            address: res.data[0].Address,
            port: res.data[0].ServicePort
        };

    } catch (err) {
        console.error("[Resolve Error]", err.message);
        throw err;
    }
}

app.get("/:service/info", async (req, res) => {
    const service = req.params.service; // a / b / c

    try {
        const resolved = await resolveService(service);
        const url = `http://${resolved.address}:${resolved.port}/info`;

        const response = await axios.get(url);

        res.json({
            from: service,
            data: response.data
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () =>
    console.log(`API Gateway running on port ${PORT}`)
);
