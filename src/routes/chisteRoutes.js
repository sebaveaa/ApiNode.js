
const express = require('express');

Router.put('/:id',chisteController.updateChiste);
Router.get('/random', chisteController.getRandomChisteId);
const chisteController = require("../controllers/chisteController")
const Router = express.Router();
const Chiste = require("../models/chiste.model")
Router.get("/:f",chisteController.getChiste)
Router.post("/Propio", chisteController.postChiste);



module.exports = Router;
