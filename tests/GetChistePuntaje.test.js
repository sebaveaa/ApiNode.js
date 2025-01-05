const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); 
const Chiste = require('../src/models/chiste.model');

describe('GET /chistes/puntaje/:puntaje', () => {
    // Conectar a la base de datos y crear chistes de prueba antes de todas las pruebas
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`; // Cambia esta URL a la de tu base de datos de prueba
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        const chistes = [
            { texto: "Chiste 1", autor: "Autor 1", puntaje: 5, categoria: "Chistoso" },
            { texto: "Chiste 2", autor: "Autor 2", puntaje: 7, categoria: "Chistoso" },
            { texto: "Chiste 3", autor: "Autor 3", puntaje: 5, categoria: "Chistoso" }
        ];
        await Chiste.insertMany(chistes);
    });

    // Desconectar de la base de datos y eliminar todos los chistes después de todas las pruebas
    afterAll(async () => {
        await Chiste.deleteMany({});
        await mongoose.connection.close();
    });

    it('debería devolver todos los chistes con la puntuación indicada', async () => {
        const response = await request(app)
            .get('/chistes/puntaje/5')
            .expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0].puntaje).toBe(5);
        expect(response.body[1].puntaje).toBe(5);
    });

    it('debería devolver un array vacío si no hay chistes con la puntuación indicada', async () => {
        const response = await request(app)
            .get('/chistes/puntaje/10')
            .expect(200);

        expect(response.body.length).toBe(0);
    });
});
