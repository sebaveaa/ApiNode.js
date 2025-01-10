//usado para hacer peticiones a la api
const request = require("supertest");
const app = require("../src/app");
const mongoose = require('mongoose');
//necesario para la conexion con la base de datos y que no se cuelgue

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB');
});

afterAll(async () => {
    await mongoose.connection.close();   
});

describe("GET /chistes/fuente/", () => {
  
    test("deberia traer un chiste al pasar el parametro Chuck ", async () => {
        const respuesta = await request(app).get("/api/chistes/fuente/Chuck").send();
        expect(typeof respuesta.body).toBe('object');
        expect(respuesta.status).toEqual(200);
    })

    test("deberia traer un chiste al pasar el parametro Dad ", async () => {      
        const Dad = await request(app).get("/api/chistes/fuente/Dad").send();
        expect(Dad.status).toBe(200);
        expect(typeof Dad.body).toBe('object');
    });
    
    test("deberia traer un chiste al pasar el parametro Propio ", async () => {     
        const Propio = await request(app).get("/api/chistes/fuente/Propio").send();
        expect(Propio.status).toBe(200);
        expect(typeof Propio.body).toBe('object');
    });

    test("deberia fallar al pasar una fuente incorrecta", async () => {
        respuesta = await request(app).get("/api/chistes/fuente/joven").send();
        expect(respuesta.status).toBe(400);
        expect(typeof respuesta.body).toBe('object');
    });
});


