const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        min: [0, "Quantity must be a positive number."],
        default: 0,
    },
  });

const LocationSchema = new mongoose.Schema({
    areaName: {
        type: String,
        trim: true,
        required: [true, "Location name is required."],
    },
    inventory: [subSchema]
}, { timestamps: true });


module.exports = mongoose.model("Location", LocationSchema);