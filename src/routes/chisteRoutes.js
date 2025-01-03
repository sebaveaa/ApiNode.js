
const express = require('express');


const chisteController = require("../controllers/chisteController")
const Router = express.Router();
/**
 * @route PUT /chistes/:id
 * @desc Actualiza un chiste existente
 * @access Public
 * @param {string} req.params.id - El ID del chiste a actualizar
 * @param {object} req.body - Los campos para actualizar en el chiste
 * @returns {object} 200 - El chiste actualizado
 * @returns {object} 404 - No se encontró el chiste
 * @returns {object} 400 - Error de validación u otro error
 */
Router.put('/:id',chisteController.updateChiste);
/**
 * @route GET /chistes/random
 * @desc Obtiene el ID de un chiste aleatorio
 * @access Public
 * @returns {object} 200 - Un objeto con el ID del chiste aleatorio
 * @returns {object} 404 - No se encontraron chistes
 * @returns {object} 500 - Error del servidor
 */
Router.get('/random', chisteController.getRandomChisteId);
Router.get("/:f",chisteController.getChiste)
Router.post("/Propio", chisteController.postChiste);



module.exports = Router;
