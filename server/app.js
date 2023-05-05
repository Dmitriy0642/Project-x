const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("port") ?? 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
