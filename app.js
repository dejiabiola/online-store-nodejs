const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');



const errorController = require('./controllers/error');
const mongoConnect = require('./util/mongodb-database').mongoConnect
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk('5ec5b36c47da95d6d353a8ad')
  .then(user => {
    req.user = user
    next()
  })
  .catch(err => console.log(err))
  // const user = new User({ name: 'Adedeji Abiola', email: 'adedejiabiola56@gmail.com'})
  // user.save()
  // .then(user => {
  //   next()
  //   console.log(user)
  // })
  // .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect(() => {
  console.log("Appjs verifed! We are connected")
  app.listen(3000)
})

