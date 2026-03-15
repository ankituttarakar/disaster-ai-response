const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Disaster Response AI Server Running");
});

app.post("/report", async (req, res) => {
    const { report } = req.body;

    res.json({
        message: "Report received",
        report: report
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});