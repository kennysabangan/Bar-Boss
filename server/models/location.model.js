const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        min: [0, "Quantity must be a positive number."],
        required: true,
        default: 0,
    },
  });

const LocationSchema = new mongoose.Schema({
    areaName: {
        type: String,
        trim: true,
        required: [true, "Location name is required."],
    },
    inventory: [itemSchema]
}, { timestamps: true });


module.exports = mongoose.model("Location", LocationSchema);