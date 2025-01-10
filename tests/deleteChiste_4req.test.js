const request = require("supertest");
const app = require("../src/app");
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB')

  });

afterAll(async () => {
      await mongoose.connection.close();
  });

describe("DELETE /chistes/fuente/Propio", () => {
    
  test("debería eliminar un chiste al pasar el id", async () => {

    const chiste = {
      texto:'¿Cómo se despiden los químicos? Ácido un placer.',
      puntaje: 1,
      categoria: 'Malo'
    }
  
    const respuestaPost = await request(app).post("/api/chistes/fuente/Propio").send(chiste);
    const idChiste = respuestaPost.body._id;
    console.log(idChiste);

    const respuestaDelete = await request(app).delete(`/api/chistes/fuente/Propio/${idChiste}`).send();
     console.log(respuestaDelete.text);
    expect(respuestaDelete.status).toBe(200);
   
  });
  
  test("deberia fallar al pasar un id incorrecto", async () => {
    const respuesta = await request(app).delete("/api/chistes/fuente/Propio/ijijij").send();
    expect(respuesta.status).toBe(400);
    await mongoose.connection.close();
  });
  
});
