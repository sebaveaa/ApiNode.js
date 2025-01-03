const express = require('express');
const chisteController = require("../controllers/chisteController")
const Router = express.Router();
const Chiste = require("../models/chiste.model")


//indican la ruta y la funcion a llamar, se usa el controller correspondiente

Router.put('/:id',chisteController.updateChiste);
Router.get('/random', chisteController.getRandomChisteId);
Router.get("/:f",chisteController.getChiste);
Router.post("/Propio", chisteController.postChiste);



module.exports = Router;
