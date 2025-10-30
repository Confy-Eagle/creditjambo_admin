const pool = require('../config/db');

// Get all users (without exposing sensitive data)
async function getAllUsers() {
  const [rows] = await pool.query(`
    SELECT id, name, email, role, created_at 
    FROM users 
    ORDER BY created_at DESC
  `);
  return rows;
}

// Optional: Get one user with related info
async function getUserDetails(userId) {
  const [userRows] = await pool.query(`
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ?
  `, [userId]);

  const user = userRows[0];
  if (!user) return null;

  const [deviceRows] = await pool.query(`
    SELECT id, device_id, device_info, verified, created_at
    FROM devices
    WHERE user_id = ?
  `, [userId]);

  const [balanceRows] = await pool.query(`
    SELECT balance FROM balances WHERE user_id = ?
  `, [userId]);

  return {
    ...user,
    devices: deviceRows,
    balance: balanceRows[0]?.balance || 0
  };
}

module.exports = { getAllUsers, getUserDetails };
