const Product = require('../models/product');
const Cart = require('../models/cart');
const Shop = require('../models/user')

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
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
  Product.findAll()
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
  req.user.getCart().then(cart => {
    return cart.getProducts()
  })
  .then(cartProducts => {
    console.log(cartProducts)
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
  let fetchedCart
  let newQuantity = 1
  //* First get the cart
  req.user.getCart()
  .then(cart => {
    // * store the cart in a global variable then return the products belonging to that cart
    fetchedCart = cart
    return cart.getProducts({ where: { id: prodId }})
  })
  .then(products => {
    //* Check if there's products belonging to the cart
    let product
    if (products.length > 0) {
      product = products[0]
    }
    //* Set the new quantity
    if (product) {
      // todo: write logic for handling increase of cart product quantity
      const oldQuantity = product.cartItem.quantity
      newQuantity = oldQuantity + 1
      return product
    }
    //* return the exact product the user wants to add from the product db
    return Product.findByPk(prodId)
  })
  .then(product => {
    return fetchedCart.addProduct(product, { through: { quantity: newQuantity }})
  })
  .then(added => {
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({ where: { id: prodId }})
  })
  .then(products => {
    const [ product ] = products
    return product.cartItem.destroy()
  })
  .then(() => {
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
