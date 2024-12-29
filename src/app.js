const express = require("express");
const chisteRouter = require("./routes/chisteRoutes");


const app = express();

app.use(express.json())//hace que el body de la peticion sea un json
app.use("/api/chistes/fuente", chisteRouter)


module.exports = app;