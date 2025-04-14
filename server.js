require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static("public"));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

require("./routes")(app);

app.listen(PORT, () => {
  console.log("server is running...", PORT);
});
