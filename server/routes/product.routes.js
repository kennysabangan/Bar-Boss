const ProductController = require('../controllers/product.controller');

module.exports = (app) => {
    app.get('/api/products', ProductController.findAllProducts);
    app.post('/api/products/add', ProductController.createProduct);
    app.get('/api/products/:id', ProductController.findProduct);
    app.put('/api/products/:id', ProductController.updateProduct);
    app.delete('/api/products/:id', ProductController.deleteProduct);
}