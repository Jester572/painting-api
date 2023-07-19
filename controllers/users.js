const mongodb = require('../db/connect');
const { UserSchema } = require('../schemas');
const ObjectId = require('mongodb').ObjectId;

const database = mongodb.getDb().db('paintings').collection('users');

const getUsers = async (req, res) => {
    try {
        const results = await database.find()
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
        const githubId = profile.id;

        const results = await database.find({ githubId: githubId });
        results.toArray().then(async (lists) => {
            if (lists.length === 0) {
                console.log('no users');
                addUser(profile);
            } else {
                return lists[0];
            }
        });
    } catch (error) {
        throw error;
    }
};

const addUser = async (profile) => {
    try {
        const result = await UserSchema.validateAsync(profile);
        const response = await database.insertOne(profile);

        if (response.acknowledged) {
            return response;
        } else {
            throw new Error('Error occurred while adding user');
        }

    } catch (error) {
        throw error;
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