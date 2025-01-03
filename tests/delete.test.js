const request = require("supertest");
const app = require("../src/app");
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB');
  });

  afterAll(async () => {
      await mongoose.connection.close();
  });

describe("DELETE /chistes", () => {
    
  

  test("debería eliminar un chiste al pasar el id", async () => {

    const chiste = {
      texto:'¿Cómo se despiden los químicos? Ácido un placer.',
      puntaje:1,
      categoria: 'Malo'
    }
  
    const respuestaPost = await request(app).post("/api/chistes/fuente/Propio").send(chiste);
    const idChiste = respuestaPost.body._id;

    const respuestaDelete = await request(app).delete(`/api/chistes/fuente/delete/${idChiste}`).send();
    expect(respuestaDelete.status).toBe(200);
  });
  
  test("deberia fallar al pasar un id incorrecto", async () => {
    respuesta = await request(app).delete("/api/chistes/delete/idFalso").send();
    expect(respuesta.status).toBe(404);
  });
  
});