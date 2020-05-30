


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: req.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  console.log(req.isLoggedIn)
  res.redirect('/')
}