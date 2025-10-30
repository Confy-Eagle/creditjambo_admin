const pool = require('../config/db');

async function getStats(req, res) {
  try {
    const [[users]] = await pool.query('SELECT COUNT(*) AS total_users FROM users');
    const [[devices]] = await pool.query('SELECT COUNT(*) AS total_devices FROM devices');
    const [[verifiedDevices]] = await pool.query('SELECT COUNT(*) AS verified_devices FROM devices WHERE verified = 1');
    const [[transactions]] = await pool.query('SELECT COUNT(*) AS total_transactions FROM transactions');
    const [[balance]] = await pool.query('SELECT SUM(balance) AS total_balance FROM balances');

    res.json({
      total_users: users.total_users,
      total_devices: devices.total_devices,
      verified_devices: verifiedDevices.verified_devices,
      total_transactions: transactions.total_transactions,
      total_balance: balance.total_balance || 0
    });
  } catch (err) {
    console.error('Dashboard Stats Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getStats };
