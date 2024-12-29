const express = require('express');
//const chisteController = require("../controllers/chisteController")
const Router = express.Router();
const Chiste = require("../models/chiste.model")


//indican la ruta y la funcion a llamar, se usa el controller correspondiente

Router.get("/:f", async (req, res) => {
    const fuente = req.params.f;
    let chiste = {};
    const fuentesValidas = ['Chuck', 'Dad', 'Propio'];

    if (!fuentesValidas.includes(fuente)) {
        return res.status(400).json({ error: 'Fuente de chiste invalida' });
    }

    try {
        const fetch = (await import('node-fetch')).default;
        let response;
        let data= {};
        switch(fuente) {
            case "Chuck":
                response = await fetch('https://api.chucknorris.io/jokes/random');
                data = await response.json();
                chiste = data.value;
                console.log(chiste);
                res.status(200).send(`<h2>Chiste de Chuck Norris ARRGHHH </h2><img src='${data.icon_url}'> ${chiste}`);
                break;
            case "Dad":
                response = await fetch('https://icanhazdadjoke.com/', {
                    headers: {'Accept': 'application/json'}
                })
                data = await response.json();
                chiste = data.joke;
                console.log(chiste);
                res.status(200).send(`<h2>Chiste de papa</h2>${chiste}`);
                break;
            case "Propio":
                chiste = await Chiste.aggregate([{ $sample: { size: 1 } }]);//trae un array del tamaño pedido en este caso 1
                res.status(200).send(`<h2>Chiste proveniente de DB </h2> ${chiste[0].texto}`);
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({status: 'FAILED', error:error.message}); };
    //'Error en la petición a Api externa o a DB'
});


module.exports = Router;
