const express = require("express");
const bodyParser = require("body-parser");
const chisteRouter = require("./routes/chisteRoutes");

const app = express();

app.use(bodyParser.json())
app.use("/api/chistes", chisteRouter)

module.exports = app;