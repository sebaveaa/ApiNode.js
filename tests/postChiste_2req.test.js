
//usado para hacer peticiones a la api
const request = require("supertest");
const app = require("../src/app");
const mongoose = require('mongoose');
const Chiste = require('../src/models/chiste.model');
//necesario para la conexion con la base de datos y que no se cuelgue

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB');
    await Chiste.deleteOne({
    texto: '¿Cómo se despiden los químicos? Ácido un placer.'
  });
});

afterAll(async () => {
  //borra el chiste ingresado para asegurar que no se mantenga luego del test
  await Chiste.deleteOne({
    texto: '¿Cómo se despiden los químicos? Ácido un placer.'
  });
  await mongoose.connection.close(); 
});

describe("Post /chistes/fuente/Propio", () => {
  const chiste = {
    texto: '¿Cómo se despiden los químicos? Ácido un placer.',
    puntaje: 7,
    categoria: 'Chistoso'
  };

  test("deberia traer el mismo chiste que se ingresa ", async () => {
    const respuesta = await request(app).post("/api/chistes/fuente/Propio").send(chiste)
     // .set('Accept', 'application/json');
    expect(respuesta.status).toBe(201);
    expect(respuesta.body.texto).toBe(chiste.texto);
    expect(respuesta.body.puntaje).toBe(chiste.puntaje);
    expect(respuesta.body.categoria).toBe(chiste.categoria);
    expect(typeof respuesta.body._id).toBe('string');
  });

  test("deberia fallar al no dar los campos minimos ", async () => {
    const chisteIncompleto = { ...chiste };
    delete chisteIncompleto.puntaje;//borra un campo del chiste completo

    const respuesta = await request(app).post("/api/chistes/fuente/Propio").send(chisteIncompleto)
    expect(respuesta.status).toBe(400);
    expect(typeof respuesta.body).toBe('object');
  });

  test("deberia fallar al pasar un chiste ya existente ", async () => {

    const respuesta = await request(app).post("/api/chistes/fuente/Propio").send(chiste);
    
    expect(respuesta.status).toBe(409);
    expect(typeof respuesta.body).toBe('object');
  });
});

