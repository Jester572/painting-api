const express = require('express');
const routes = express.Router();
const picturesController = require('../controllers/pictures');

//Pictures
routes.get('/pictures',picturesController.getPictures);

routes.get('/pictures/:id',picturesController.getSinglePicture);

routes.post('/pictures', picturesController.addPicture);

routes.put('/pictures/:id', picturesController.editPicture);

routes.delete('/pictures/:id', picturesController.deletePicture);

//Artists

routes.get('/artists',picturesController.getArtists);

routes.get('/artists/:id',picturesController.getPictureByArtist);


module.exports = routes;
