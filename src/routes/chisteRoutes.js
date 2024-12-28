const express = require('express');
//const chisteController = require("../controllers/chisteController")
const Router = express.Router();


//indican la ruta y la funcion a llamar, se usa el controller correspondiente
Router.get("/:fuente", (req, res) => {
    const fuente = req.params.fuente.toLowerCase();
    if(!fuente)
        res.status(400).send(`<h2>Papi mandaste la vaina vacia eres bruto</h2>`);

    switch(fuente){
        case "chuck":
            res.status(200).send(`<h2>Chiste proveniente de Chuck Fuente: ${fuente}</h2>`);
            break;
        case "dad":
            res.status(200).send(`<h2>Chiste proveniente de Dad Fuente: ${fuente}</h2>`);
            break;
        case "propio":
            res.status(200).send(`<h2>Chiste proveniente de DB Fuente: ${fuente}</h2>`);
            break;
        default:
            res.status(400).send({status:'FAILED',error:'parametro incorrecto registrado'});
            break;
    }
    res.status(200).send(`<h2>It's Working! Fuente: ${fuente}</h2>`);
});


module.exports = Router;
