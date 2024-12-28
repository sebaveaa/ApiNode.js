const express = require('express');
//const chisteController = require("../controllers/chisteController")
const Router = express.Router();

//indican la ruta y la funcion a llamar, se usa el controller correspondiente
Router.get("/", (req, res) => {
  res.status(400).send("<h2>It's Working!</h2>");
});


module.exports = Router;
