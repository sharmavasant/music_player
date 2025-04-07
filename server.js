require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const ejs = require("ejs");
const path = require("path");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

require("./routes")(app);

app.listen(PORT, () => {
  console.log("server is running...", PORT);
});
