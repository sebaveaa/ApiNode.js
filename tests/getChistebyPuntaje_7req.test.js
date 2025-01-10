const request = require('supertest');
const mongoose = require('mongoose');
const app = require("../src/app.js");
const Chiste = require("../src/models/chiste.model.js");

describe('GET /chistes/puntaje/:puntaje', () => {
    // Conecta  la base de datos y se crean chistes de prueba antes de todas las pruebas
    beforeAll(async () => {
        const url = 'mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB'; 
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        const chistes = [
            { texto: "Chiste 1", autor: "Autor 1", puntaje: 5, categoria: "Chistoso" },
            { texto: "Chiste 2", autor: "Autor 2", puntaje: 7, categoria: "Chistoso" },
            { texto: "Chiste 3", autor: "Autor 3", puntaje: 5, categoria: "Chistoso" }
        ];
        await Chiste.insertMany(chistes);
    });

   
    afterAll(async () => {
        await Chiste.deleteOne({texto: 'Chiste 1'});
        await Chiste.deleteOne({texto: 'Chiste 2'});
        await Chiste.deleteOne({texto: 'Chiste 3'});
        
        await mongoose.connection.close();
    });

    it('debería devolver todos los chistes con la puntuación indicada', async () => {
        const response = await request(app)
            .get('/api/chistes/fuente/Propio/puntaje/5')
            .expect(200);
    });

    it('debería devolver 404 si no hay chistes con la puntuación indicada', async () => {
        const response = await request(app)
            .get('/api/chistes/fuente/Propio/puntaje/11')
            .expect(404);
    });
});
