const Product = require('../models/product');
const Order = require('../models/order');


exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        path: '/products',
        pageTitle: 'Product Detail',
        product: product,
      })
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.product')
    .execPopulate()
    .then(user => {
    const products = user.cart.items
    console.log('got cart products')
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products,
    });
  })
  .catch(err => {
    console.log(err)
  })
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product)
  })
  .then(result => {
    console.log('product has been added to cart')
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
  Order.find({ "user.userId": req.user._id })
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders,
    });
  })
  .catch(err => console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.product')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(item => {
        return {
          product: { ...item.product._doc },
          quantity: item.quantity
        }
      })
      const order = new Order({
        products: products,
        user: {
          email: req.user.email,
          userId: req.user
        }
      })
      return order.save()
    })
    .then(result => {
      return req.user.clearCart()
    })
    .then(result => {
      console.log('posted orders')
      res.redirect('/orders')
    })
    .catch(err => console.log(err))
}
