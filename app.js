const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const User = require('./models/user.js')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user
    next()
  }).catch(err => {
    console.log(err)
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// ! You can use either 'belongsTo' or 'hasOne'. You do ot need to do the two
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)

//* For many to many association, you have to add an object as 2nd arguement telling 
//* sequelize where the relations id should be stored.
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })


// * .sync will sync all defined models to the db and basically creates table for them
sequelize
  // .sync({force: true})
  .sync()
  .then(result => {
    return User.findByPk(1)
  }).then(user => {
    if (!user) {
      return User.create({ name: 'Deji', email: 'deji@zipp.com' })
    }
    return user
  }).then(user => {
    return user.createCart();
  }).then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })


