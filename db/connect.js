const  { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initdb = (callback) => {
    const uri = process.env.connection_string;
    const client = new MongoClient(uri);
    _db = client;

    if (_db) {
        console.log('Db is already initialized');
        return callback(null, _db)
    }

    client.connect()
        .then((client) => {
            _db = client;
            callback(null, _db);
        }).catch((error) => {
            callback(error);
        })

}

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db
}

module.exports = {initdb, getDb}