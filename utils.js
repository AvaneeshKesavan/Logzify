const fs = require("fs");

function formatLog(entry, format = "plain") {
  switch (format) {
    case "json":
      return JSON.stringify(entry);
    case "csv":
      return `${entry.timestamp},${entry.method},${entry.route},${entry.status},${entry.ip},${entry.duration}`;
    default: // plain
      return `[${entry.level.toUpperCase()}] ${entry.timestamp} - ${entry.method} ${entry.route} (${entry.status}) from ${entry.ip} in ${entry.duration}`;
  }
}

function writeToFile(logText, filePath) {
  fs.appendFile(filePath, logText + "\n", (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
}

function shouldLog(entry, filter = {}) {
  for (const key in filter) {
    if (entry[key] !== filter[key]) return false;
  }
  return true;
}

module.exports = { formatLog, writeToFile, shouldLog };
