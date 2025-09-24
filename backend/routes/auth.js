const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt:', { username, password: password ? '[HIDDEN]' : 'empty' });

  try {
    const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);
    console.log('Database query result:', rows.length, 'rows found');

    if (rows.length === 0) {
      console.log('No admin found with username:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];
    console.log('Admin found:', { id: admin.id, username: admin.username, passwordHash: admin.password.substring(0, 20) + '...' });

    const isValidPassword = await bcrypt.compare(password, admin.password);
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      console.log('Password mismatch for user:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log('JWT token generated successfully');
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change password (protected)
router.post('/change-password', async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  console.log('Change password attempt for:', username);

  try {
    const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);
    console.log('Database query result:', rows.length, 'rows found');

    if (rows.length === 0) {
      console.log('No admin found with username:', username);
      return res.status(404).json({ error: 'Admin not found' });
    }

    const admin = rows[0];
    console.log('Admin found:', { id: admin.id, username: admin.username });

    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
    console.log('Current password valid:', isValidPassword);

    if (!isValidPassword) {
      console.log('Current password mismatch for user:', username);
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log('New password hashed successfully');

    // Update the password in the database
    await db.execute('UPDATE admins SET password = ? WHERE id = ?', [hashedNewPassword, admin.id]);
    console.log('Password updated successfully for admin:', username);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
