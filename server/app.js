const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const initDataBase = require("./startUp/initDataBase.js");
const routes = require("./routes");
const cors = require("cors");
const path  = require("path")
const app = express();
const PORT = config.get("port") ?? 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

if(process.env.NODE_ENV === "production"){
  app.use("/",express.static(path.join(__dirname,"client")))
  const indexPath = path.join(__dirname, "client","index.html")
  app.get("*",(req,res)=>{
    res.sendFile(indexPath)
  })
}


async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });
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
