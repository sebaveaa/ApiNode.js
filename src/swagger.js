const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//metadata para el link de swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Chistes',
            description: 'Aqui se pueden visualizar las rutas y documentacion de la API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/chisteRoutes.js','./src/models/chiste.model.js'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerDocs = (app,port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/api/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
            res.send(swaggerSpec);
        });

    console.log(`API Docs disponibles en http://localhost:${port}/api/docs`)
}

module.exports = {swaggerDocs};
