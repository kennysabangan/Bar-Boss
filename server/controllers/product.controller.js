const Product = require('../models/product.model');

module.exports = {
    findAllProducts: (req, res) => {
        Product.find({})
            .then(products => res.json(products))
            .catch(err => res.json(err));
    },
    createProduct: (req, res) => {
        Product.create(req.body)
            .then(product => res.json(product))
            .catch(err => res.status(400).json(err));
    },
    findProduct: (req, res) => {
        Product.findOne({ _id: req.params.id })
            .then(product => res.json(product))
            .catch(err => res.json(err));
    },
    updateProduct: (req, res) => {
        Product.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true, runValidators: true })
            .then(updatedProduct => res.json(updatedProduct))
            .catch(err => res.status(400).json(err))
    },
    deleteProduct: (req, res) => {
        Product.findOneAndDelete({ _id: req.params.id })
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err));
    },
}