const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db = null; // Initialize the _db variable to null.

const initdb = async (callback) => {
  if (_db) {
    console.log('Db is already initialized');
    return callback(null, _db);
  }

  const uri = process.env.connection_string;
  const client = new MongoClient(uri);
  _db = client
  await client.connect()
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

initdb().catch(console.error)

module.exports = { initdb, getDb }; // Combine both functions in a single export statement
