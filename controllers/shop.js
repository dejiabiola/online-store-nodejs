const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        path: '/products',
        pageTitle: 'Product Detail',
        product: product
      })
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cartProducts => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cartProducts
    });
  })
  .catch(err => {
    console.log(err)
  })
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return req.user.addToCart(product)
  })
  .then(result => {
    console.log(result)
  })
  .then(added => {
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId)
  .then(() => {
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(err => console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder()
  .then(result => {
    res.redirect('/orders')
  })
  .catch(err => console.log(err))
}
