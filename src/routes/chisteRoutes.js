const express = require('express');
//const chisteController = require("../controllers/chisteController")
const Router = express.Router();


//indican la ruta y la funcion a llamar, se usa el controller correspondiente

Router.get("/fuente/:f", async (req, res) => {
    const fuente = req.params.f.toLowerCase();
    let chiste = {};

    try {
        const fetch = (await import('node-fetch')).default;
        let response;
        let data= {};
        switch(fuente) {
            case "chuck":
                response = await fetch('https://api.chucknorris.io/jokes/random');
                data = await response.json();
                chiste = data.value;
                console.log(chiste);
                res.status(200).send(`<h2>Chiste de Chuck Norris ARRGHHH </h2><img src='${data.icon_url}'> ${chiste}`);
                break;
            case "dad":
                response = await fetch('https://icanhazdadjoke.com/', {
                    headers: {'Accept': 'application/json'}
                })
                data = await response.json();
                chiste = data.joke;
                console.log(chiste);
                res.status(200).send(`<h2>Chiste de papa</h2>${chiste}`);
                break;
            case "propio":
                res.status(200).send(`<h2>Chiste proveniente de DB Fuente: ${fuente}</h2>`);
                break;
            default:
                res.status(400).json({status: 'FAILED', error: 'Parametro incorrecto registrado'});
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status: 'FAILED', error:error.message}); };
    //'Error en la petición a Api externa'
});




module.exports = Router;
