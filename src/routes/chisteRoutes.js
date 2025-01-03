
const express = require('express');

const chisteController = require("../controllers/chisteController")
const Router = express.Router();
const Chiste = require("../models/chiste.model")


/**
 * @openapi
 * /api/chistes/fuente/{fuente}:
 *   get:
 *     tags:
 *       - Chistes
 *     summary: Busca un chiste al azar de la fuente especificada.
 *     description: Busca un chiste al azar de la fuente especificada. 
 *     parameters:
 *       - name: fuente
 *         in: path
 *         required: true
 *         description: La fuente a donde busca el chiste ("Chuck", "Dad", "Propio"). Afectan las mayusculas.
 *         schema:
 *           type: string
 *           example: Chuck
 *     responses:
 *       200:
 *         description: Se ha traido exitosamente un chiste de la fuente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: "61dbae02-c147-4e28-863c-db7bd402b2d6"
 *                     texto: "I remember when I was a kid, I opened my fridge and noticed one of my vegetables were crying. I guess I have some emotional cabbage."
 *                     autor: "Juancito"
 *                     puntaje: 6
 *                     categoria: "Dad joke"
 *       400:
 *         description: Solicitud incorrecta, la fuente especificada no es válida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Fuente de chiste invalida
 */
Router.get("/:f",chisteController.getChiste);

/**
 * @openapi 
 * /api/chistes/fuente/Propio:
 *   post:
 *     tags:
 *       - Chistes
 *     summary: Agrega un nuevo chiste a la base de datos.
 *     description: Agrega un nuevo chiste a la base de datos. Se necesitan mínimo los campos texto, puntaje y categoria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: El texto del chiste.
 *                 example: "Why dont scientists trust atoms? Because they make up everything!"
 *               autor:
 *                 type: string
 *                 description: El autor del chiste.
 *                 example: "Juancito (OPCIONAL)"
 *               puntaje:
 *                 type: number
 *                 description: El puntaje del chiste.
 *                 example: 8
 *               categoria:
 *                 type: string
 *                 description: La categoría del chiste.
 *                 example: "Dad joke"
 *     responses:
 *       201:
 *         description: Chiste agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Created
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: "61dbae02-c147-4e28-863c-db7bd402b2d6"
 *                     texto: "Why don't scientists trust atoms? Because they make up everything!"
 *                     autor: "Juancito"
 *                     puntaje: 8
 *                     categoria: "Dad joke"
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Faltan datos o Chiste ya existe"
 *       500:
 *         description: Hubo problemas con la solicitud por parte del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Mensaje proveniente del error
 */
Router.post("/Propio", chisteController.postChiste);

Router.put('/:id', chisteController.putChiste);

module.exports = Router;
