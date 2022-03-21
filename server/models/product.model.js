const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Product name is required."]
    },
    category: {
        type: String,
        required: [true, "Product category is required."]
    },
    type: {
        type: String,
        trim: true,
        required: [true, "Product type is required."]
    },
    unitQty: {
        type: Number,
        trim: true,
        required: [true, "Product unit quantity is required."],
        min: [1, "Unit quantity must be a positive number."]
    },
    units: {
        type: String,
        trim: true,
        required: [true, "Product units are required."]
    },
    container: {
        type: String,
        trim: true,
        required: [true, "Product container is required."]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Product price is required."],
        min: [0.01, "Price must at least cost $0.01"]
    },
}, { timestamps: true });

ProductSchema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true
    next()
})

module.exports = mongoose.model("Product", ProductSchema);