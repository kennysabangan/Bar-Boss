const LocationController = require('../controllers/location.controller');

module.exports = (app) => {
    app.get('/api/locations', LocationController.findAllLocations);
    app.post('/api/locations/create', LocationController.addLocation);
    app.get('/api/locations/:id', LocationController.findLocation);
    app.delete('/api/locations/:id', LocationController.deleteLocation);
    app.put('/api/locations/:id/add', LocationController.addItem);
    app.put('/api/locations/:id/:inventoryId', LocationController.editItem);
}