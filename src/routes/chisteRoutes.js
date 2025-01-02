
const express = require('express');
/**
 * @module chisteRoutes
 * @requires ../controllers/chisteController
 * 
 * This module sets up the routes for handling chiste (joke) related requests.
 * 
 * @see {@link ../controllers/chisteController} for the controller functions used in these routes.
 */
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
 *         description: La fuente a donde busca el chiste ("Chuck", "Dad", "Propio").
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

Router.get("/:f",chisteController.getChiste)
Router.post("/Propio", chisteController.postChiste);



module.exports = Router;
