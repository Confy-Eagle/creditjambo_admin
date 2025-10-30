const { getAllUsers, getUserDetails } = require('../services/userService');

async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function viewUser(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserDetails(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { listUsers, viewUser };
