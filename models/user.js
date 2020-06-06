const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId, 
          ref: 'Product'
        }, 
        quantity: { 
          type: Number, 
          required: true 
        }
      }
    ]
  },
})

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.product.toString() === product._id.toString()
  })
  let newQuantity = 1
  const updatedCartItems = [ ...this.cart.items ]
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1
    updatedCartItems[cartProductIndex].quantity = newQuantity
  } else {
    updatedCartItems.push({ product: product._id, quantity: newQuantity })
  }
  const updatedCart = {
    items: updatedCartItems
  }
  this.cart = updatedCart
  return this.save()
}

userSchema.methods.deleteItemFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.product.toString() !== productId.toString()
  })
  this.cart.items = updatedCartItems
  return this.save()
} 

userSchema.methods.clearCart = function() {
  this.cart = { items: [] }
  return this.save();
}


module.exports = mongoose.model('User', userSchema)





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
