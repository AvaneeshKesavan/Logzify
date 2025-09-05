# Logzify

A simple, customizable HTTP request logger middleware for Express.js apps.

## Features
- Log method, route, status, IP, duration, timestamp
- Formats: JSON, CSV, or plain text
- Optional file logging
- Custom route/method filters

## Installation
Clone the repo or copy the middleware into your project.

## Usage
```js
const logzify = require("./logzify");
app.use(logzify({
  format: "json",
  toFile: true,
  filter: { method: "GET" }
}));
