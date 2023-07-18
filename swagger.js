const swaggerAutogen = require('swagger-autogen')();
const j2s = require('joi-to-swagger');
const schema = require('./schemas/index');

const { swagger: painting } = j2s(schema.PaintingSchema)

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    '@definitions': {
        swagger: painting,
    },
    host: 'cse341-paintings.onrender.com',
    basePath: '/',
    schemes: ['https']
};
console.log(doc);

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

module.exports = { doc };
