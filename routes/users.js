const express = require('express');
const routes = express.Router();
const usersController = require('../controllers/users');

routes.get('/users', usersController.getUsers);

routes.get('/users/:id', usersController.getSingleUser);


routes.put('/users/:id', usersController.editUser);

routes.delete('/users/:id', usersController.deleteUser);

module.exports = routes;
