
const express = require('express');


const chisteController = require("../controllers/chisteController")
const Router = express.Router();

Router.put('/:id',chisteController.updateChiste);
Router.get('/random', chisteController.getRandomChisteId);
Router.get("/:f",chisteController.getChiste)
Router.post("/Propio", chisteController.postChiste);



module.exports = Router;
