const express = require('express');
const routes = express.Router();
const paintingsController = require('../controllers/paintings');

//Paintings
routes.get('/login', (req, res) => {
    res.redirect('/auth')
})

routes.get('/paintings', paintingsController.getPaintings);

routes.get('/painting_names', paintingsController.getPaintingNames);

routes.get('/paintings/:id', paintingsController.getSinglePainting);

routes.post('/paintings', paintingsController.addPainting);

routes.put('/paintings/:id', paintingsController.editPainting);

routes.delete('/paintings/:id', paintingsController.deletePainting);

//Artists

routes.get('/artists', paintingsController.getArtists);


module.exports = routes;
