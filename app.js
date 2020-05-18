const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const User = require('./models/user.js')
const Products = require('./models/product')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Products.belongsTo(User, { constraints: true, onDelete: 'CASCADE'})
User.hasMany(Products)

// * .sync will sync all defined models to the db and basically creates table for them
sequelize
  .sync({force: true})
  .then(result => {
   app.listen(3000);
  }).catch(err => {
    console.log(err)
  })


