const express = require('express');
const chisteController = require("../controllers/chisteController")
const Router = express.Router();
const Chiste = require("../models/chiste.model")


//indican la ruta y la funcion a llamar, se usa el controller correspondiente

Router.get("/:f",chisteController.getChiste );

Router.post("/Propio",async(req, res) => {
    const {texto, puntaje, categoria} = req.body;
    if (!texto || !puntaje || !categoria) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const chisteExistente = await Chiste.findOne({ texto });
        if (chisteExistente) {
        return res.status(400).json({ error: 'Chiste ya existe' });
        }
        const chiste = await Chiste.create(req.body);
        res.status(201).json(chiste);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});



module.exports = Router;
