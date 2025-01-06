//usado para hacer peticiones a la api
const request = require("supertest");
const app = require("../src/app");
const mongoose = require('mongoose');
const Chiste = require("../src/models/chiste.model");
//necesario para la conexion con la base de datos y que no se cuelgue

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB');
});

afterAll(async () => {
    await mongoose.connection.close();   
});

describe("GET /chistes/fuente/contarChistes/${categoria}", () =>{

    test("deberia traer la cantidad de chistes de la categoria Malo", async () => {
        const respuesta = await request(app).get("/api/chistes/fuente/contarChistes/Malo").send();
        expect(respuesta.status).toBe(200);
        expect(typeof respuesta.body).toBe('object');
    });

    test("deberia fallar al pasar una categoria incorrecta", async () => {
        const respuesta = await request(app).get("/api/chistes/fuente/contarChistes/Inexistente").send();
        expect(respuesta.status).toBe(404);
    });

    test("deberia dar error ya que no hay chistes en la categoria Humor Negro", async() => { 
        //se eliminan primero todos los chistes de Humor Negro
        const chistes = await Chiste.find({'categoria': 'Humor Negro'}).lean().exec();
        await Chiste.deleteMany({'categoria': 'Humor Negro'});

        const respuesta = await request(app).get("/api/chistes/fuente/contarChistes/Humor%20Negro").send();
        const cantidad = respuesta.body.cantidad;

        await Chiste.insertMany(chistes)

        expect(respuesta.status).toBe(400);
        expect(cantidad).toEqual(0);

    
    });
});

