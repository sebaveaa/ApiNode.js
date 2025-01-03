const request = require('supertest');
const mongoose = require('mongoose');
const app = require("../src/app");
const Chiste = require("../src/models/chiste.model.js");

describe('PUT /chistes/:id', () => {
    let chisteId;

    // Antes de todas las pruebas, conectar a la base de datos y crear un chiste
    beforeAll(async () => {
        const url = 'mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB'; // Cambia esta URL a la de tu base de datos de prueba
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        const chiste = new Chiste({
            texto: "Este es un chiste de prueba",
            autor: "Autor de Prueba",
            puntaje: 5,
            categoria: "Chistoso"
        });
        await chiste.save();
        chisteId = chiste._id;
    });

    afterAll(async () => {
        await Chiste.deleteOne({
            texto: 'Texto del chiste actualizado'
        });
        await Chiste.deleteOne({
            texto: 'Este es un chiste de prueba'
        });
        await mongoose.connection.close();
    });

    it('debería actualizar un chiste existente', async () => {
        const updates = {
            texto: "Texto del chiste actualizado",
            puntaje: 7,
            categoria:"Malo"
        };

        const response = await request(app)
            .put(`/api/chistes/fuente/${chisteId}`)
            .send(updates)
            .expect(200);

        expect(response.body.texto).toBe(updates.texto);
        expect(response.body.puntaje).toBe(updates.puntaje);
    });

    it('debería devolver 404 si el chiste no se encuentra', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updates = {
            texto: "Texto del chiste actualizado",
            puntaje: 7,
            categoria:"Malo"
        };

        const response = await request(app)
            .put(`/api/chistes/fuente/${nonExistentId}`)
            .send(updates)
            .expect(404);

        expect(response.body.message).toBe('Chiste no encontrado');
    });
});
