const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



//Pictures

const getPictures = async (req, res) => {
    const database = mongodb.getDb().db('paintings').collection('paintings');
    const pictureId = new ObjectId(req.params.id);
    const results = await database.find();
    results.toArray().then((lists) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSinglePicture = async (req, res) => {

};

const addPicture = async (req, res) => {

};

const editPicture = async (req, res) => {

};

const deletePicture = async (req, res) => {

};

//Artists

const getArtists = async (req, res) => {

};

const getPictureByArtist = async (req, res) => {

}

module.exports = {
    getPictures,
    getSinglePicture,
    addPicture,
    editPicture,
    deletePicture,
    getArtists,
    getPictureByArtist
}