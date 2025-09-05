const fs = require("fs");
const path = require("path");
const { formatLog, writeToFile, shouldLog } = require("./utils");

function logzify(userOptions = {}) {
  const defaultOptions = {
    format: "json",
    toFile: true,
    filter: {},
    filePath: path.join(__dirname, "log.txt"),
  };

  const options = { ...defaultOptions, ...userOptions };

  return (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = `${Date.now() - start}ms`;
      const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        route: req.originalUrl,
        status: res.statusCode,
        ip: req.ip,
        duration,
        level: "info"
      };

      if (shouldLog(logEntry, options.filter)) {
        const logText = formatLog(logEntry, options.format);

        console.log(logText); // print to console
        if (options.toFile) writeToFile(logText, options.filePath);
      }
    });

    next();
  };
}

module.exports = logzify;
