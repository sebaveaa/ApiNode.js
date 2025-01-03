//modulo hecho para usar supertest
const app = require('./app');
const mongoose = require('mongoose');
const {swaggerDocs} = require("./swagger");

//var de entorno agregada en package.json, es 8000
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API escuchando a puerto ${PORT}`)
    console.log();
    console.log(`Visitar http://localhost:${PORT}/api/chistes/fuente/Dad para ver los Dad Jokes`);
    console.log(`Visitar http://localhost:${PORT}/api/chistes/fuente/Chuck para ver los chistes de Chuck Norris`);
    console.log(`Visitar http://localhost:${PORT}/api/chistes/fuente/Propio para ver los chistes de la BD`);
    console.log();
    swaggerDocs(app,PORT);
});

mongoose.connect('mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
