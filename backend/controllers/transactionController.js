const { getAllTransactions, getTransactionsByUser } = require('../services/transactionService');

async function listAll(req, res) {
  try {
    const transactions = await getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function listByUser(req, res) {
  try {
    const { userId } = req.params;
    const transactions = await getTransactionsByUser(userId);
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { listAll, listByUser };
