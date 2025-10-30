const { getAllDevices, verifyDevice, deleteDevice } = require('../services/deviceService');

async function listDevices(req, res) {
  try {
    const devices = await getAllDevices();
    res.json(devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateVerification(req, res) {
  try {
    const { id } = req.params;
    const { verified } = req.body;
    console.log("Updating device:", id, "Verified:", verified); // ✅ Log inputs
    const updated = await verifyDevice(id, verified);
    res.json({ message: 'Device verification updated', device: updated });
  } catch (err) {
    console.error("❌ verifyDevice error:", err); // ✅ Log actual error
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}


async function removeDevice(req, res) {
  try {
    const { id } = req.params;
    await deleteDevice(id);
    res.json({ message: 'Device deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { listDevices, updateVerification, removeDevice };
