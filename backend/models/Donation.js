const db = require('../config/database');

class Donation {
  static async create(donationData) {
    const { full_name, phone, region, district, category } = donationData;
    const [result] = await db.execute(
      'INSERT INTO donations (full_name, phone, region, district, category, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [full_name, phone, region, district, category, 'تم الاستلام']
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM donations ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM donations WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    await db.execute('UPDATE donations SET status = ? WHERE id = ?', [status, id]);
  }

  static async getStats() {
    const [total] = await db.execute('SELECT COUNT(*) as count FROM donations');
    const [underProcess] = await db.execute('SELECT COUNT(*) as count FROM donations WHERE status = ?', ['تحت المعالجة']);
    const [completed] = await db.execute('SELECT COUNT(*) as count FROM donations WHERE status = ?', ['مكتمل']);
    return {
      total: total[0].count,
      underProcess: underProcess[0].count,
      completed: completed[0].count
    };
  }
}

module.exports = Donation;
