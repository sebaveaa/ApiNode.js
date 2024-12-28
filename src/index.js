//modulo hecho para usar supertest
const app = require('./app');
const swaggerDocs = require("./swagger");

//var de entorno agregada en package.json, es 8000
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API escuchando a puerto ${PORT}`)
    console.log(`visitar http://localhost:${PORT}/api/chistes `);
    swaggerDocs(app,PORT)
});