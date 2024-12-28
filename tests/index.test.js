//usado para hacer peticiones a la api
const request = require("supertest");
const app = require("../src/app");

describe("GET /chistes", () => {
  
  test("deberia traer un chiste al pasar el parametro correcto ", async () => {
    
    const Chuck = await request(app).get("api/chistes/fuente/Chuck").send();
    expect(typeof Chuck.body).toBe('object');
    expect(Chuck.status).toBe(200);
    
    
      
    const Dad = await request(app).get("api/chistes/fuente/Dad").send();
    expect(Dad.status).toBe(200);
    expect(typeof Dad.body).toBe('string');

    const Propio = await request(app).get("api/chistes/fuente/Propio").send();
    expect(Propio.status).toBe(200);
    expect(typeof Propio.body).toBe('object');
  })

  test("deberia fallar al pasar una fuente incorrecta", async () => {
      respuesta = await request(app).get("api/chistes/fuente/hhhh").send();
      expect(respuesta.status).toBe(400);
      //expect(typeof respuesta.body).toBe('object');
  });
});


