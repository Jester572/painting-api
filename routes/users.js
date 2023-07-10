const express = require('express');
const routes = express.Router();
const usersController = require('../controllers/users');

routes.get('/users', usersController.getAllUsers);

routes.get('/users/:id',usersController.getSinglePicture);

routes.post('/users', usersController.addPicture);

routes.put('/users/:id', usersController.editPicture);

routes.delete('/users/:id', usersController.deletePicture);

module.exports = routes;
