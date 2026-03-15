const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// serve dashboard files
app.use(express.static(path.join(__dirname, "../.kiro/specs/dashboard")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../.kiro/specs/dashboard/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});