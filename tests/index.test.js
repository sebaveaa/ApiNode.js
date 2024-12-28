//usado para hacer peticiones a la api
const request = require("supertest");
const app = require("../src/app");

describe("GET /chistes", () => {
  
  test("deberia traer un chiste al pasar el parametro correcto ", async () => {
    
    const Chuck = await request(app).get("/api/chistes/Chuck").send();
    expect(Chuck.status).toBe(200);
    expect(Chuck.body).toHaveProperty('joke');
    expect(Chuck.body.joke).toHaveProperty('author');
    expect(Chuck.body.joke).toHaveProperty('id');
          
    const Dad = await request(app).get("/api/chistes/Dad").send();
    expect(Dad.status).toBe(200);
    expect(Dad.body).toHaveProperty('joke');
    expect(Dad.body.joke).toHaveProperty('author');
    expect(Dad.body.joke).toHaveProperty('id');

    const Propio = await request(app).get("/api/chistes/Propio").send();
    expect(Propio.status).toBe(200);
    expect(Propio.body).toHaveProperty('joke');
    expect(Propio.body.joke).toHaveProperty('author');
    expect(Propio.body.joke).toHaveProperty('id');
  })

  test("deberia fallar al pasar un parametro incorrecto", async () => {
    const response = await request(app).get("/api/chistes/Unknown").send();
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

});


