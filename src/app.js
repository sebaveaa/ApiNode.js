const express = require("express");
const chisteRouter = require("./routes/chisteRoutes");

const app = express();

app.use("/api/chistes", chisteRouter)

module.exports = app;