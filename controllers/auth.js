const bcrypt = require('bcryptjs')

const User = require('../models/user')


exports.getLogin = (req, res, next) => {
  let message = req.flash('error')
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: false,
    errorMessage: message
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
      req.flash('error', 'Invalid email or password')
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
  let message = req.flash('error')
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isLoggedIn: false,
    errorMessage: message
  })
}

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({email: email})
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'This email already exists')
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