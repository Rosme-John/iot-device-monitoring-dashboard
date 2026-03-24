const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// Register a new device
router.post('/', deviceController.createDevice);

// Get all devices
router.get('/', deviceController.getDevices);

// Update device status and sensor readings
router.put('/:id', deviceController.updateDevice);

// Delete device
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;
