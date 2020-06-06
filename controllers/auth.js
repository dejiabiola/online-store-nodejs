const bcrypt = require('bcryptjs')

const User = require('../models/user')


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: false,
    errorMessage: req.flash('error')
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({email: email})
  .then(user => {
    if (!user) {
      req.flash('error', 'Invalid email or password')
      return res.redirect('/login')
    }

    bcrypt.compare(password, user.password)
    .then(doMatch => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          if (err) console.log(err)
          res.redirect('/');
        })
      }
      console.log('wrong password')
      res.redirect('/login')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/login')
    })
    
  })
  .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/')
  })
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isLoggedIn: false
  })
}

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  console.log(email, password, confirmPassword)
  User.findOne({email: email})
    .then(userDoc => {
      if (userDoc) {
        res.redirect('/signup')
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: {
              items: []
            }
          })
          return user.save()
        })
        .then(result => {
          res.redirect('/login')
        })
    })
    .catch(err => {
      console.log(err)
    })
}