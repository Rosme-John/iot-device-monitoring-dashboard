const Device = require('../models/Device');

// Create a new device
exports.createDevice = async (req, res) => {
  try {
    const { deviceId, name } = req.body;

    if (!deviceId || !name) {
      return res.status(400).json({ message: 'deviceId and name are required.' });
    }

    const existing = await Device.findOne({ deviceId });
    if (existing) {
      return res.status(409).json({ message: 'Device with this deviceId already exists.' });
    }

    const device = await Device.create({
      deviceId,
      name,
      status: 'offline',
      lastUpdated: new Date(),
    });

    res.status(201).json(device);
  } catch (error) {
    console.error('createDevice error:', error);
    res.status(500).json({ message: 'Failed to create device.' });
  }
};

// Get all devices
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find().sort({ updatedAt: -1 });
    res.json(devices);
  } catch (error) {
    console.error('getDevices error:', error);
    res.status(500).json({ message: 'Failed to fetch devices.' });
  }
};

// Update device status/data
exports.updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, temperature, humidity } = req.body;

    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found.' });
    }

    if (status) {
      if (!['online', 'offline'].includes(status)) {
        return res.status(400).json({ message: 'Status must be online or offline.' });
      }
      device.status = status;
    }

    if (typeof temperature !== 'undefined') {
      device.temperature = Number(temperature);
    }
    if (typeof humidity !== 'undefined') {
      device.humidity = Number(humidity);
    }

    device.lastUpdated = new Date();

    await device.save();
    res.json(device);
  } catch (error) {
    console.error('updateDevice error:', error);
    res.status(500).json({ message: 'Failed to update device.' });
  }
};

// Delete a device
exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found.' });
    }

    await device.deleteOne();
    res.json({ message: 'Device deleted successfully.' });
  } catch (error) {
    console.error('deleteDevice error:', error);
    res.status(500).json({ message: 'Failed to delete device.' });
  }
};
