const Product = require('../models/product');



exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isLoggedIn: req.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({title, price, imageUrl, description, userId: req.user})
  product.save()
  .then(result => {
    console.log('Inserted product into the database')
    res.redirect('/admin/products');
  }).catch(err => { 
    console.log(err)
  })
};

exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isLoggedIn: req.isLoggedIn
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getEditProduct = (req,res,next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  Product.findById(prodId)
  .then(product => {
    if (!product) {
      res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404', isLoggedIn: req.isLoggedIn });
    }
    else {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-products',
        product: product,
        editing: editMode,
        isLoggedIn: req.isLoggedIn
      })
    } 
  }).catch(err => {
    console.log(err)
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.id
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByIdAndUpdate(prodId, {title, price, imageUrl, description})
  .then(result => {
    console.log('updated the product', product.title)
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err)
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findByIdAndRemove(prodId)
  .then(result => {
    console.log("Product has been deleted")
    res.redirect('/admin/products')
  })
  .catch(err => {
    console.log(err)
  })
}