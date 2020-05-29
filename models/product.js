const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)



// const mongoDb = require('mongodb')
// const getDb = require('../util/mongodb-database').getDb

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title
//     this.price = price
//     this.imageUrl = imageUrl
//     this.description = description
//     this._id = id ? new mongoDb.ObjectId(id) : null
//     this.userId = userId
//   }

//   save() {
//     const db = getDb()
//     let dbOperation
//     if (this._id) {
//       dbOperation = db.collection('products').updateOne({ _id: this._id }, { $set: this })
//     } else {
//       dbOperation = db.collection('products').insertOne(this)
//     }
//     return dbOperation
//       .then(result => console.log(result))
//       .catch(err => console.log(err))
//   }

//   static fetchAll() {
//     const db = getDb()
//     return db.collection('products').find().toArray()
//     .then(products => {
//       console.log(products)
//       return products
//     })
//     .catch(err => console.log(err))
//     // Find will return a cursor which allows us go through the data in our collection
//   }

//   static findByPk(prodId) {
//     const db = getDb()
//     return db.collection('products').find({ _id: new mongoDb.ObjectId(prodId) }).next()
//     .then(product => {
//       console.log("Gotten the product", product)
//       return product
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }

//   static deleteByPk(prodId) {
//     const db = getDb()
//     return db.collection('products').deleteOne({ _id: new mongoDb.ObjectId(prodId) })
//     .then(result => console.log('Data delete successful'))
//     .catch(err => console.log(err))
//   }
// }


// module.exports = Product