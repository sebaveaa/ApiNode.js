//usado para hacer peticiones a la api
const request = require("supertest");
const app = require("../src/app");

describe("GET /chistes", () => {
  test("deberia fallar al no pasar un parametro", async () => {
    const response = await request(app).get("/api/chistes").send();
    expect(response.status).toBe(400);
  });

  //test("deberia traer un chiste al pasar un parametro correcto", async () => {
    //const response = await request(app).get("/tasks").send();
   // expect(response.body).toBeInstanceOf(Array);
 // });
});