const Chiste = require('../models/chiste.model')
const mongoose = require('mongoose');


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

const getChistePropio = async () => {
    const chiste = await Chiste.aggregate([{ $sample: { size: 1 } }]);
    return chiste[0];
};

const postChiste = async (json) => {
    return await Chiste.create(json);
    
};
const chisteExistente = async (json) => {
    return await Chiste.findOne(json);
}

const deleteChisteByID = async(id) => { 
    try {
        const resultado = await Chiste.findByIdAndDelete(id); 
        return resultado;
    } catch (error) {
        console.error('Error al eliminar el Chiste:', error); 
        throw error;
    }
}

const idvalido = (id) => {
    console.log(mongoose.Types.ObjectId.isValid(id));
    return mongoose.Types.ObjectId.isValid(id);
};


const putChisteByID = async (id, updates) => {
    try {   
        const chiste = await Chiste.findByIdAndUpdate(id, updates, { new: true, runValidators: true }); 
        return chiste;
    } catch (error) {
        console.error('Error al actualiazar el Chiste:', error); 
        throw error;
    }
};

const getCantidadDeChistesPorCategoria = async (categoria) => {
    try{
        const cantidad = await Chiste.countDocuments({ 'categoria': categoria });
        return cantidad;
    }
    catch (error){
        throw error;
    }
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



const getChistesByPuntaje = async (puntaje) => {
    try {
        const chistes = await Chiste.find({ 'puntaje': puntaje });
        return JSON.stringify(chistes);

    } catch (error) {
        throw new Error('Error al obtener los chistes');
    }
};





module.exports = {
    getChuckJoke,
    getDadJoke,
    getChistePropio,
    chisteExistente,
    postChiste,
    deleteChisteByID,
    putChisteByID,
    getCantidadDeChistesPorCategoria,
    getChisteById,
    getChistesByPuntaje,
    idvalido
};