const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("port") ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// if (process.env.NODE_ENV === "production") {
//   console.log("Prodcution");
// } else {
//   console.log("development");
// }

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();
