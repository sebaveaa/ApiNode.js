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
                chiste = await chisteService.getRandomChiste();
                if(chiste){
                    res.status(200).send(`<h1>Chiste proveniente de DB </h1><h2> ${chiste.texto}</h2>Id en Db: ${chiste._id}`);
                }
                else{
                    res.status(404).send('<h1>No se encontraron chistes en la DB.</h1>');
                }
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({status: 'FAILED', error:error.message}); };
    //'Error en la petición a Api externa o a DB'

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
        res.status(500).json({ error: error.message});
    }
};

const deleteChiste = async (req, res) => {
    const id = req.params.f;
    try {
        const chiste = await chisteService.deleteChisteByID(id);
        if (chiste) { 
            res.status(200).send(`<h1>Chiste ${chiste._id} eliminado</h1><h2> Texto: ${chiste.texto} </h2>`);
        } else {
            res.status(404).send('No se encontró el chiste para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar el Chiste:', error);
        res.status(500).send({status: 'FAILED', error: error.message});
    }
};

module.exports ={
    getChiste,
    postChiste,
    deleteChiste
};