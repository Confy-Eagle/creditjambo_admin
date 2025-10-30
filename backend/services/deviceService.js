const pool = require('../config/db');

async function getAllDevices() {
  const [rows] = await pool.query('SELECT * FROM devices ORDER BY created_at DESC');
  return rows.map(d => ({
    ...d,
    verified: d.verified === 1 || d.verified === true
  }));
}
async function verifyDevice(id, verified) {
  const value = verified ? 1 : 0;
  await pool.query('UPDATE devices SET verified = ? WHERE id = ?', [value, id]);
  const [rows] = await pool.query('SELECT * FROM devices WHERE id = ?', [id]);
  return rows[0];
}


async function deleteDevice(id) {
  await pool.query('DELETE FROM devices WHERE id = ?', [id]);
}

module.exports = { getAllDevices, verifyDevice, deleteDevice };
