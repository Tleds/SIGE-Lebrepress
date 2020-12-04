const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';

const endpointsFile = ['./src/routes.js'];

swaggerAutogen(outputFile, endpointsFile);