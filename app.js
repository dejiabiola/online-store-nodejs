const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose')


const errorController = require('./controllers/error');
const mongoConnect = require('./util/mongodb-database').mongoConnect

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  next()
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


// const uri = "mongodb+srv://dejiabiola:aa270494@cluster0-aq5ph.mongodb.net/shop?retryWrites=true&w=majority";
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("mongoDb connected")
//   app.listen(3000)
// })
// .catch(err => console.log(err))

mongoConnect(() => {
  console.log("Appjs verifed! We are connected")
  app.listen(3000)
})

