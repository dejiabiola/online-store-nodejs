const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const mongoose = require('mongoose')
const User = require('./models/user')

const uri = `mongodb+srv://dejiabiola:aa270494@cluster0-aq5ph.mongodb.net/shop?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: uri,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); 
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'a very long string especially in production', 
  resave: false, 
  saveUninitialized: false, 
  store: store
}))


app.use((req, res, next) => {
  User.findById('5ed0596e95b1d5879aae1347')
  .then(user => {
    req.user = user
    next()
  })
  .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.get404);



mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Deji',
        email: 'deji@zipp.com',
        cart: {
          items: [],
        }
      })
      user.save()
    }
  })
  console.log('Db is connected, user is connected and we are live!')
  app.listen(3000)
}).catch(err => console.log(err))



