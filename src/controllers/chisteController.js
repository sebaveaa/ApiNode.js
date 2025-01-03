const chisteService = require('../services/chisteService');


const getChiste = async (req, res) => {
    
    const fuente = req.params.f;
    let chiste = {};
    const fuentesValidas = ['Chuck', 'Dad', 'Propio'];
    //Error con parametros incorrectos
    if (!fuentesValidas.includes(fuente)) {
        return res.status(400).json({ error: 'Fuente de chiste invalida' });
    }

    try {

        let data= {};
        switch(fuente) {
            case "Chuck":
                chiste = await chisteService.getChuckJoke();
                res.status(200).send(`<h1>Chiste de Chuck Norris ARRGHHH </h1><img src='${chiste[1]}'><h2> ${chiste[0]}</h2>`);
                break;
            case "Dad":
                chiste = await chisteService.getDadJoke();
                res.status(200).send(`<h1>Chiste de papa</h2><h2>${chiste}</h2>`);
                break;
            case "Propio":
                chiste = await chisteService.getRandomChiste(); // LLamada a db desde Service
                res.status(200).send(`<h1>Chiste proveniente de DB </h1><h2> ${chiste.texto}</h2>Id en Db: ${chiste._id}`);
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({status: 'FAILED', error:error.message}); };
    //'Error en la petición a Api externa o a DB'

};
// chisteController.js

const Chiste = require('../models/chiste.model');

const updateChiste = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const chiste = await Chiste.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!chiste) {
            return res.status(404).send({ message: 'Chiste no encontrado' });
        }
        res.status(200).send(chiste);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};





const postChiste= async(req, res) => {
    const { texto, puntaje, categoria } = req.body;
    if (!texto || !puntaje || !categoria) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const chisteExistente = await chisteService.chisteExistente({ texto });
        if (chisteExistente) {
            return res.status(400).json({ error: 'Chiste ya existe' });
        }

        const chiste = await chisteService.postChiste(req.body);
        res.status(201).json(chiste);
    } catch (error) {
    res.status(500).json({ message: error.message});
}
};


const getRandomChisteId = async (req, res) => {
    try {
        const chiste = await Chiste.aggregate([{ $sample: { size: 1 } }]);
        if (chiste.length === 0) {
            return res.status(404).send({ message: 'No se encontraron chistes' });
        }
        res.status(200).send({ id: chiste[0]._id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



module.exports ={
    getChiste,
    postChiste,
    updateChiste,
    getRandomChisteId
};

