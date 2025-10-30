const pool = require('../config/db');

// Get all transactions (joined with user info)
async function getAllTransactions() {
  const [rows] = await pool.query(`
    SELECT 
      t.id, t.user_id, u.name AS user_name, u.email AS user_email,
      t.type, t.amount, t.balance_after, t.description, t.created_at
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    ORDER BY t.created_at DESC
  `);
  return rows;
}

// Filter by user ID
async function getTransactionsByUser(userId) {
  const [rows] = await pool.query(`
    SELECT 
      id, user_id, type, amount, balance_after, description, created_at
    FROM transactions
    WHERE user_id = ?
    ORDER BY created_at DESC
  `, [userId]);
  return rows;
}

module.exports = { getAllTransactions, getTransactionsByUser };
