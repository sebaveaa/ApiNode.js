# ApiNode.js

## Para correr el proyecto con docker:

1: Abrir la terminal en posición del proyecto y ejecutar:
`docker build . -t api-chistes `
Luego de que se cree la imagen, para correr se debe ejecutar:
`docker run -p 3000:3000 api-chistes:latest`

## Para correr el proyecto sin Docker

Para correr el proyecto es necesario descargar nodejs version v22.11.0 e instalar las dependencias.
Para esto, teniendo el proyecto abierto en el editor de su preferencia, entrar a la terminal y correr los comandos:

    npm install
    npm update

Se deberían instalar las dependencias necesarias con npm update, pero si falta alguna, dará un error del siguiente estilo:

    Error: Cannot find module 'modulo'

En este caso, correr el comando :

    npm i modulo

Por ejemplo, con el error: `Error: Cannot find module 'swagger-jsdoc'`
Correr el comando: `npm i swagger-jsdoc`

Luego de tener todo instalado, se puede correr el proyecto con el comando:

    npm run dev

Para correr los tests, utilizar el comando:

    npm run test
