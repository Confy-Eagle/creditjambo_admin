const { findByEmail } = require('../services/adminService');
const { comparePassword } = require('../utils/crypto');
const { sign, verify } = require('../utils/jwt');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Missing credentials' });

    const admin = await findByEmail(email);
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = comparePassword(password, admin.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = sign({ sub: admin.id, role: 'admin' });
    res.json({
      message: 'Login successful',
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getProfile(req, res) {
  try {
    const decoded = verify(req.headers.authorization?.split(' ')[1]);
    if (!decoded) return res.status(401).json({ message: 'Invalid token' });

    const admin = await findByEmail(decoded.email);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json({ id: admin.id, name: admin.name, email: admin.email });
  } catch (err) {
    console.error('GetProfile Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { login, getProfile };
