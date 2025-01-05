const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); 
const Chiste = require('../src/models/chiste.model');

describe('GET /chistes/:id', () => {
    let chisteId;

    //Conexion con la base de datos y creamos un chiste para asi obtener su id
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

    // Después realizar las pruebas, desconectar de la base de datos 
    afterAll(async () => {
        await Chiste.deleteOne({
            texto: 'Este es un chiste de prueba'
        });

        await mongoose.connection.close();
    });

    it('debería devolver un chiste existente por su ID', async () => {
        const response = await request(app).get(`/api/chistes/fuente/getChisteID/${chisteId}`).send();
        expect(typeof response.body).toBe('object');
        expect(response.status).toBe(200);
    });

    it('debería devolver 404 si el chiste no se encuentra', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .get(`/api/chistes/fuente/GetChisteID/${nonExistentId}`)
            .expect(404);

        expect(response.body.message).toBe('Chiste no encontrado');
    });
});
