const express = require('express');
const chisteController = require("../controllers/chisteController")
const Router = express.Router();
const Chiste = require("../models/chiste.model")


//indican la ruta y la funcion a llamar, se usa el controller correspondiente

Router.get("/:f",chisteController.getChiste );


module.exports = Router;
