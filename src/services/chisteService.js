const Chiste = require('../models/chiste.model')


const getChuckJoke = async () => {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    const chiste =[data.value,data.icon_url];
    return chiste;
};

const getDadJoke = async () => {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }// necesario para retornar un json de la api
    });
    const data = await response.json();
    return data.joke;
};

const getRandomChiste = async () => {
    const chiste = await Chiste.aggregate([{ $sample: { size: 1 } }]);
    return chiste[0];
};

const postChiste = async (json) => {
    return await Chiste.create(json);
    
};
const chisteExistente = async (json) => {
    return await Chiste.findOne(json);
    return await Chiste.findOne(id)
}

/**
 * Servicio para obtener un chiste por su ID
 * @param {string} id - ID del chiste
 * @returns {object|null} - El chiste encontrado o null si no se encuentra
 */
const getChisteById = async (id) => {
    try {
        const chiste = await Chiste.findById(id);
        return chiste;
    } catch (error) {
        throw new Error('Error al obtener el chiste');
    }
};




module.exports = {
    getChuckJoke,
    getDadJoke,
    getRandomChiste,
    chisteExistente,
    postChiste,
    getChisteById
};