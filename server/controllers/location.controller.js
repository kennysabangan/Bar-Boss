const Location = require('../models/location.model');

module.exports = {
    addLocation:(req, res) => {
        Location.create({ areaName: req.body.name })
            .then(location => res.json(location))
            .catch(err => res.status(400).json(err));
    },
    findAllLocations: (req, res) => {
        Location.find({}).populate('inventory.product')
            .then(locations => res.json(locations))
            .catch(err => res.json(err));
    },
    findLocation: (req, res) => {
        Location.findOne({ _id: req.params.id }).populate('inventory.product')
            .then(location => res.json(location))
            .catch(err => res.json(err))
    },
    deleteLocation: (req, res) => {
        Location.findOneAndDelete({ _id: req.params.id })
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err));
    },
    addItem: (req, res) => {
        Location.findOneAndUpdate({ _id: req.params.id }, { $push: { inventory: [{product: req.body.itemId, quantity: req.body.quantity}] }}, { new: true, runValidators: true })
            .then(updatedLocation => res.json(updatedLocation))
            .catch(err => res.json(err));
    },
    editItem: (req, res) => {
        Location.findOneAndUpdate(
            {"inventory._id": req.params.inventoryId },
            {$set: {"inventory.$[select].quantity": req.body.quantity } },
            {
                arrayFilters: [{ "select._id": req.params.inventoryId }],
                new: true
            })
            .then(updatedItem => res.json(updatedItem))
            .catch(err => res.json(err));
    }
}

// db.locations.findOneAndUpdate(
//     { 'inventory._id' : ObjectId("62381e11fa834d508999932c")} , {$set: {"inventory.$[select].quantity": 10} }, { arrayFilters: [{ "select._id": ObjectId("62381e11fa834d508999932c")}], new: true })