const express = require("express");
const logzify = require("../logzify");

const app = express();

// Use the logzify middleware
app.use(logzify({
  format: "plain",      // Change to "json" or "csv" if you want
  toFile: true,
  filter: { method: "GET" }  // Optional filter
}));

app.get("/", (req, res) => {
  res.send("Hello from Logzify example app!");
});

app.post("/data", (req, res) => {
  res.send("POST received.");
});

app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});
