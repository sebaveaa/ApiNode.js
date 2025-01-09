# ApiNode.js

## Para correr el proyecto con docker:

1: Abrir la terminal en posición del proyecto y ejecutar:
`docker build . -t api-chistes `
Luego de que se cree la imagen, para correr se debe ejecutar:
`docker run -p 3000:3000 api-chistes:latest`

## Para correr el proyecto sin Docker

Descargar ultima version se nodejs

Correr en la terminar el comando:
`npm install`

Para ejecutar el proyecto correr:
`npm start`

Para ejecutar los tests correr:
`npm run test`
