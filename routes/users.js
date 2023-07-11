const express = require('express');
const routes = express.Router();
const usersController = require('../controllers/users');

routes.get('/users', usersController.getAllUsers);

routes.get('/users/:id', usersController.getSinglePainting);

routes.post('/users', usersController.addPainting);

routes.put('/users/:id', usersController.editPainting);

routes.delete('/users/:id', usersController.deletePainting);

module.exports = routes;
