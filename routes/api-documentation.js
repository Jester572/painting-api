const express = require('express');
const routes = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = routes;