const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description)
  product.save()
  .then(result => {
    console.log('Inserted product into the database')
    res.redirect('/admin/products');
  }).catch(err => { 
    console.log(err)
  })
};

// exports.getProducts = (req, res, next) => {
//   req.user.getProducts()
//   .then(products => {
//     res.render('admin/products', {
//       prods: products,
//       pageTitle: 'Admin Products',
//       path: '/admin/products'
//     });
//   }).catch(err => {
//     console.log(err)
//   })
// };

// exports.getEditProduct = (req,res,next) => {
//   const prodId = req.params.productId;
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   //* Instead of the below, you can still do Product.findByPk(prodId).then(product)
//   req.user.getProducts({where: { id: prodId}})
//   .then(products => {
//     // ! remember that getProducts will always return an array of products even if it is only one value
//     const [product] = products
//     if (!product) res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
//     else {
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-products',
//         product: product,
//         editing: editMode
//       })
//     } 
//   }).catch(err => {
//     console.log(err)
//   })
// }

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.id
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDescription = req.body.description;
//   Product.findByPk(prodId).then(product => {
//     product.title = updatedTitle;
//     product.imageUrl = updatedImageUrl;
//     product.price = updatedPrice;
//     product.description = updatedDescription;
//     return product.save();
//   }).then(result => {
//     console.log('updated the product', updatedTitle)
//     res.redirect('/admin/products');
//   }).catch(err => {
//     console.log(err)
//   })
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.id;
//   Product.findByPk(prodId).then(product => {
//     return product.destroy()
//   }).then(result => {
//     console.log("Product has been deleted")
//     res.redirect('/admin/products')
//   })
//   .catch(err => {
//     console.log(err)
//   })
  
// }