// seed.js
const pool = require('./config/db');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    const name = 'Super Admin';
    const email = 'admin@creditjambo.com';
    const password = 'Admin@123';
    const hash = bcrypt.hashSync(password, 10);

    const [existing] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('✅ Admin already exists');
      process.exit(0);
    }

    await pool.query(
      'INSERT INTO admins (name, email, password_hash, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, hash]
    );

    console.log('🎉 Admin account created successfully!');
    console.log('➡️  Email:', email);
    console.log('➡️  Password:', password);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedAdmin();
