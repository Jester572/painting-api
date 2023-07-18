const mongodb = require('../db/connect');
const { PaintingSchema } = require('../schemas/index');
const ObjectId = require('mongodb').ObjectId;

const database = mongodb.getDb().db('paintings').collection('paintings');

//Paintings

const getPaintings = async (req, res) => {
    try {
        const results = await database.find();
        results.toArray().then((lists) => {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (error){
        res.status(500).json(res.error || 'Error occurred while retrieving paintings');
    }
};

const getSinglePainting = async (req, res) => {
    try {
        const paintingId = new ObjectId(req.params.id);

        const results = await database.find({_id: paintingId});
        results.toArray().then((lists) => {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (error) {

    }
};

const addPainting = async (req, res) => {
    try {
        const newPainting = {
            painting_title: req.body.painting_title,
            artist: req.body.artist,
            date_created: req.body.date_created,
            period: req.body.period,
            keywords: req.body.keywords,
            location: req.body.location,
            url: req.body.url
        };

        const result = await PaintingSchema.validateAsync(newPainting);
        const response = await database.insertOne(newPainting);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Error occurred while adding painting');
        }
    } catch (error){
        if (error.isJoi === true) {
            res.status(422).json(error);
        }
    }
};

const editPainting = async (req, res) => {

    try{
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

        const result = await PaintingSchema.validateAsync(newPainting);

        const response = await database.replaceOne({_id: paintingId}, newPainting);

        if (response.acknowledged) {
            res.status(201).json(res);
        } else {
            res.status(500).json(res.error || 'Error occurred while adding painting');
        }
    } catch (error){
        if (error.isJoi === true) {
            res.status(422).json(error);
        }
    }

};

const deletePainting = async (req, res) => {

    try {
        const userId = new ObjectId(req.params.id);
        const response = await database.deleteOne({_id: userId});

        if (response.acknowledged) {
            res.status(204).json(res);
        } 
    } catch(error) {
        res.status(500).json(res.error || 'Error occurred while deleting Painting');
    }
};

//Artists

const getArtists = async (req, res) => {
    try {
        const results = await database.distinct("artist");
        // console.log(await results.toArray());
        // results.toArray().then((lists) => {
        //     artists = lists.map((list) => {return list.artist})
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(res);
    } catch (error) {
        res.status(500).json(res.error || 'Error occurred while retrieving artists');
    }
    // });
};

const getPaintingNames = async (req, res) => {
    try {
        const results = await database.distinct("painting_title")
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(results);
    } catch(error) {
        res.status(500).json(res.error || 'Error occurred while retrieving paintings');
    }
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