const mongodb = require('../db/connect');
const { PaintingSchema } = require('../schemas/index');
const ObjectId = require('mongodb').ObjectId;

const database = mongodb.getDb().db('paintings').collection('paintings');

//Paintings

const getPaintings = async (req, res) => {
    const results = await database.find();
    results.toArray().then((lists) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSinglePainting = async (req, res) => {
    const paintingId = new ObjectId(req.params.id);
    console.log(paintingId);
    const results = await database.find({_id: paintingId});
    results.toArray().then((lists) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const addPainting = async (req, res) => {
    const newPainting = {
        painting_title: req.body.painting_title,
        artist: req.body.artist,
        date_created: req.body.date_created,
        period: req.body.period,
        keywords: req.body.keywords,
        location: req.body.location,
        url: req.body.url
    };

    const result = await PaintingSchema.validateAsync(newPainting)

    const response = await database.insertOne(newPainting);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error occurred while adding painting');
    }

};

const editPainting = async (req, res) => {
    const paintingId = new ObjectId(req.params.id);
    const newPainting = {
        painting_title: req.body.painting_title,
        artist: req.body.artist,
        date_created: req.body.date_created,
        period: req.body.period,
        keywords: req.body.keywords,
        location: req.body.location,
        url: req.body.url
    };
    const response = await database.replaceOne({_id: paintingId}, newContact);
    if (response.acknowledged) {
        res.status(20).json(response);
    } else {
        res.status(500).json(response.error || 'Error occurred while updating painting');
    }

};

const deletePainting = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await database.deleteOne({_id: userId});

    if (response.acknowledged) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'Error occurred while deleting Painting');
    }
};

//Artists

const getArtists = async (req, res) => {
    const results = await database.distinct("artist");
    // console.log(await results.toArray());
    // results.toArray().then((lists) => {
    //     artists = lists.map((list) => {return list.artist})
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(results);
    // });
};

const getPaintingNames = async (req, res) => {
    const results = await database.distinct("painting_title")
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(results);
};



module.exports = {
    getPaintings,
    getSinglePainting,
    addPainting,
    editPainting,
    deletePainting,
    getArtists,
    getPaintingNames
}