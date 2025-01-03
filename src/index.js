//modulo hecho para usar supertest
const app = require('./app');
const mongoose = require('mongoose');
const {swaggerDocs} = require("./swagger");

//var de entorno agregada en package.json, es 8000
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API escuchando a puerto ${PORT}`)
    console.log(`visitar http://localhost:${PORT}/api/chistes `);
    swaggerDocs(app,PORT);
});

mongoose.connect('mongodb+srv://sdvera23:1YuEwRQ2TgQKVHHa@chistesdb.kib8q.mongodb.net/?retryWrites=true&w=majority&appName=ChistesDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
