const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{productId: {type: Schema.Types.ObjectId, ref: 'Product'} , quantity: { type: Number, required: true }}]
  },
})

module.exports = mongoose.model('User', userSchema)



// const mongodb = require('mongodb')
// const getDb = require('../util/mongodb-database').getDb

// const ObjectId = mongodb.ObjectId
// class User {
//   constructor(name, email, cart, id) {
//     this.name = name
//     this.email = email
//     this.cart = cart
//     this._id = id
//   }

//   save() {
//     const db = getDb()
//     return db.collection('users').insertOne(this)
//   }

//   // Add to cart logic
//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString()
//     })
//     let newQuantity = 1
//     const updatedCartItems = [ ...this.cart.items ]
//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//       updatedCartItems.push({ productId: product._id, quantity: newQuantity })
//     }
//     const updateCart = {
//       items: updatedCartItems
//     }
//     const db = getDb()
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updateCart }}
//       ).catch(err => console.log(err))
//   }

//   getCart() {
//     const db = getDb()
//     const productIds = this.cart.items.map(item => {
//       return item.productId;
//     })
//     if (!productIds) {
//       return productIds
//     }
//     return db.collection('products').find({_id: {$in: [...productIds]}}).toArray()
//     .then(products => {
//       return products.map(product => {
//         return { ...product, 
//           quantity: this.cart.items.find(item => {
//             return item.productId.toString() === product._id.toString() 
//           }).quantity
//         }
//       })
//     })
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString()
//     })
//     const db= getDb()
//     return db.collection('users').updateOne(
//       {_id: new ObjectId(this._id)},
//       {$set: { cart: { items: updatedCartItems } }}
//     )
//   }

//   static findByPk(userId) {
//     const db = getDb()
//     return db.collection('users').findOne({_id: new ObjectId(userId)})
//   }

//   addOrder() {
//     const db = getDb()
//     return this.getCart().then(products => {
//       const order = {
//         user: { 
//           _id: new ObjectId(this._id),
//           name: this.name,
//           email: this.email
//         },
//         items: products
//       }

//       return db.collection('orders').insertOne(order)
//     }).then(result => {
//       this.cart = { items: [] }
//       return db.collection('users').updateOne(
//         {_id: new ObjectId(this._id)},
//         {$set: { cart: this.cart }}
//       )
//     })
//   }

//   getOrders() {
//     const db = getDb()
//     return db.collection('orders').find({ 'user._id': new ObjectId(this._id)}).toArray()
//   }
// }
// module.exports = User;
