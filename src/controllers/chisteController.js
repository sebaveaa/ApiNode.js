const chisteService = require('../services/chisteService');
const Chiste = require('../models/chiste.model');
const { ConnectionPoolClosedEvent } = require('mongodb');

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
                chiste = await chisteService.getChistePropio();
                if(chiste){
                    res.status(200).send(`
                        <h1>Chiste proveniente de DB </h1>
                        <h2> ${chiste.texto}</h2>
                        Autor: ${chiste.autor}<br>
                        Puntaje: ${chiste.puntaje}<br>
                        Categoría: ${chiste.categoria}<br>
                        Id en Db: ${chiste._id}
                    `);
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
/**
 * Controlador para obtener un chiste por su ID
 * @param {object} req - Objeto de solicitud que es la id del chiste a obtener
 * @param {object} res - Objeto de respuesta que es el chiste obtenido
 * @returns {void}
 */
const getChisteID = async (req, res) => {
    const { id } = req.params;

    try {
        const chiste = await chisteService.getChisteById(id);
        if (!chiste) {
            return res.status(404).send({ message: 'Chiste no encontrado' });
        }
        res.status(200).send(`
                        <h1>Chiste proveniente de DB </h1>
                        <h2> ${chiste.texto}</h2>
                        Autor: ${chiste.autor}<br>
                        Puntaje: ${chiste.puntaje}<br>
                        Categoría: ${chiste.categoria}<br>
                        Id en Db: ${chiste._id}
                    `);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const putChiste = async (req, res) => { 
    const { id } = req.params; 
    const updates = req.body; 

    try { 
        const chiste = await chisteService.putChisteByID(id, updates); 
        if (!chiste) { 
            return res.status(404).send({ message: 'Chiste no encontrado' }); 
        } 
        res.status(200).send(chiste);
    } 
    catch (error) { 
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
            return res.status(409).json({ error: 'Chiste ya existe' });
        }

        const chiste = await chisteService.postChiste(req.body);
        res.status(201).json(chiste);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};


const deleteChiste = async (req, res) => {
    const id = req.params.id;
    
    try {
            if(!chisteService.idvalido(id))
                return res.status(400).send({status: 'FAILED', error: "El usuario no paso un id valido"});

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

const getCantidadDeChistesPorCategoria = async (req, res) => {
    const categoria = req.params.f;
    const categoriasValidas = ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo'];

    if(categoriasValidas.includes(categoria) == false){
        return res.status(404).send("Categoría inválida. Las categorias son: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']");
    }

    try {
        const cantidadDeChistesPorCategoria = await chisteService.getCantidadDeChistesPorCategoria(categoria);
        if(cantidadDeChistesPorCategoria > 0){
            res.status(200).json(
                {
                    categoria: categoria,
                    cantidad: cantidadDeChistesPorCategoria
                }
            );
        }
        else{  
            res.status(400).json(
                {
                    error: `No se encontraron chistes en la categoria: ${categoria}`,
                    cantidad: 0
                }
            );
        }
    } catch (error) {
        console.error('Error al obtener la cantidad de chistes por categoria:', error);
        res.status(500).send({status: 'FAILED', error: error.message});
    }

};


/**
 * Controlador para obtener chistes por puntaje
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {void}
 */
const getChistesByPuntaje = async (req, res) => {
    const puntaje = parseInt(req.params.puntaje, 10); // Convertir a número entero

    if (isNaN(puntaje)) {
        return res.status(400).send({ error: 'Puntaje no es un número válido' });
    }

    try {
        const chistes = await chisteService.getChistesByPuntaje(puntaje);
        const array = JSON.parse(chistes);
        if (array.length === 0) {
            return res.status(404).send({ error: 'No se encontraron chistes con el puntaje indicado' });
        }
        let respuesta = [`<h1>Chistes con puntaje ${puntaje}</h1> <br>`];

        for(let a of array){
            respuesta.push(`
                <h2>${a.texto}</h2>
                Autor: ${a.autor} <br>
                Puntaje: ${a.puntaje} <br>
                Categoria: ${a.categoria} <br>
                Id en DB: ${a._id} <br>
                <br>
            `);
        }

        res.status(200).send(respuesta.join(''));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};




module.exports ={
    getChiste,
    postChiste,
    deleteChiste,
    putChiste,
    getCantidadDeChistesPorCategoria,
    getChisteID,
    getChistesByPuntaje
};