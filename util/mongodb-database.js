const mongodb = require('mongodb')
const assert = require('assert')
const MongoClient = mongodb.MongoClient


const password = process.env.PASSWORD

let _db


const mongoConnect = (callback) => {
  const uri = "mongodb+srv://dejiabiola:aa270494@cluster0-aq5ph.mongodb.net/shop?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    _db = client.db()
    callback()
  })
}


const getDb = () => {
  if (_db) {
    return _db;
  } 
  throw " No Db configured"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb


