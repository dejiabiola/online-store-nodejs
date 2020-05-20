const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient



let _db

const mongoConnect = async (callback) => {
  const uri = `mongodb+srv://dejiabiola:aa270494@cluster0-aq5ph.mongodb.net/shop?retryWrites=true&w=majority`;
  const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((err) => {
    if (err) console.log(err)

    _db = client.db('shop')
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


