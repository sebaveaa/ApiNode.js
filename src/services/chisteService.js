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
}

const deleteChisteByID = async(id) => { 
    try {
        const resultado = await Chiste.findByIdAndDelete(id); 
        return resultado;
    } catch (error) {
        console.error('Error al eliminar el documento:', error); 
        throw error;
    }
}

module.exports = {
    getChuckJoke,
    getDadJoke,
    getRandomChiste,
    chisteExistente,
    postChiste,
    deleteChisteByID
};