
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

/**
 * @swagger
 * /api/chistes/fuente/delete/{id}:
 *   delete:
 *     tags:
 *       - Chistes
 *     summary: Elimina un chiste por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del chiste a eliminar
 *     responses:
 *       200:
 *         description: Chiste eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Chiste eliminado exitosamente
 *       404:
 *         description: No se encontró el chiste para eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: No se encontró el chiste para eliminar
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 error:
 *                   type: string
 *                   example: Descripción del error
 */
Router.delete("/delete/:f", chisteController.deleteChiste);

/**
 * @swagger
 * /api/chistes/fuente/{id}:
 *   put:
 *     summary: Actualiza un chiste por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del chiste a actualizar
 *       - in: body
 *         name: updates
 *         description: Los campos a actualizar del chiste
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             texto:
 *               type: string
 *               example: ¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.
 *             autor:
 *               type: string
 *               example: Anon
 *             puntaje:
 *               type: number
 *               example: 5
 *             categoria:
 *               type: string
 *               example: Chistoso
 *     responses:
 *       200:
 *         description: Chiste actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 611cfc1c4f1c2c1a1c1c1c1c
 *                 texto:
 *                   type: string
 *                   example: ¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.
 *                 autor:
 *                   type: string
 *                   example: Anon
 *                 puntaje:
 *                   type: number
 *                   example: 5
 *                 categoria:
 *                   type: string
 *                   example: Chistoso
 *       400:
 *         description: Petición inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Descripción del error
 *       404:
 *         description: Chiste no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Chiste no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 error:
 *                   type: string
 *                   example: Descripción del error
 */
Router.put('/:id', chisteController.putChiste);

/**
 * @swagger
 * /api/chistes/fuente/contarChistes/{categoria}:
 *   get:
 *     summary: Obtiene la cantidad de chistes en una categoría específica
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         schema:
 *           type: string
 *         description: La categoría de los chistes
 *     responses:
 *       200:
 *         description: La cantidad de chistes en la categoría especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoria:
 *                   type: string
 *                   example: Humor Negro
 *                 cantidad:
 *                   type: integer
 *                   example: 5
 *                 html:
 *                   type: string
 *                   example: <h1>La cantidad es 5</h1>
 *       400:
 *         description: No se encontraron chistes en la categoría especificada
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: <h1>No se encontraron chistes en la categoría Humor Negro.</h1>
 *       404:
 *         description: Categoría inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Categoría inválida. Las categorias son: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 error:
 *                   type: string
 *                   example: Descripción del error
 */
Router.get("/contarChistes/:f", chisteController.getCantidadDeChistesPorCategoria);

/**
 * @swagger
 * /api/chistes/fuente/GetChisteID/{id}:
 *   get:
 *     summary: Obtiene un chiste por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del chiste a obtener
 *     responses:
 *       200:
 *         description: Chiste obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 611cfc1c4f1c2c1a1c1c1c1c
 *                 texto:
 *                   type: string
 *                   example: ¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.
 *                 autor:
 *                   type: string
 *                   example: Anon
 *                 puntaje:
 *                   type: number
 *                   example: 5
 *                 categoria:
 *                   type: string
 *                   example: Chistoso
 *       404:
 *         description: Chiste no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Chiste no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 error:
 *                   type: string
 *                   example: Descripción del error
 */
Router.get('/getChisteID/:id', chisteController.getChisteID);


module.exports = Router;
