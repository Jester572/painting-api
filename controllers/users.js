const mongodb = require('../db/connect');
const { UserSchema } = require('../schemas');


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

        const user = await database.findOne({ githubId: profile.githubId });
        if (user) {
            cb(null, results)
            console.log('no users');

        } else {
            user = await addUser(profile);
            cb(null, user);
        }

    } catch (error) {
        throw error;
    }
};

const addUser = async (profile) => {
    try {
        console.log(profile)
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