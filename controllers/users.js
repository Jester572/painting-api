const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const database = mongodb.getDb().db('paintings').collection('users');

const getUsers = async (req, res) => {
    try {
        const results =  await database.find()
        results.toArray().then((lists) => {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(lists)
        });
    } catch (error) {
        res.status(500).json(res.error || 'Error occurred while retrieving paintings')
    }
};

const getSingleUser = async (profile) => {
    try {
        const githubId = profile;

        const results = await database.find({githubId: githubId});
        results.toArray().then((lists) => {
            if (lists.length === 0) {
                addUser(profile);
            } else {
                res.setHeader('content-Type', 'application/json');
                res.status(200).json(lists[0]);
            }
        });
    } catch (error) {
        res.status(500).json(res.error || 'Error occurred while retrieving painting');
    }
};

const addUser = async (profile) => {
    try {
        const result = await PaintingSchema.validateAsync(profile);
        const response = await database.insertOne(profile);

        if (response.acknowledged) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'Error occurred while adding painting');
        }

    } catch (error) {
        if (error.isJoi === true) {
            res.status(422).json(error);
        }
    }
};

const editUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

module.exports = {
    getUsers,
    getSingleUser,
    addUser,
    editUser,
    deleteUser
}