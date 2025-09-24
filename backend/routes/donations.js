const express = require('express');
const Donation = require('../models/Donation');
const { authenticateToken } = require('../middleware/auth');
const XLSX = require('xlsx');

const router = express.Router();

// Get all donations (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const donations = await Donation.findAll();
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new donation (public, from form)
router.post('/', async (req, res) => {
  try {
    const { full_name, phone, region, district, category } = req.body;
    const id = await Donation.create({ full_name, phone, region, district, category });
    res.status(201).json({ id, message: 'Donation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update donation status (protected)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Donation.updateStatus(id, status);
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get statistics (protected)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await Donation.getStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export to Excel (protected)
router.get('/export', authenticateToken, async (req, res) => {
  try {
    const donations = await Donation.findAll();

    // Prepare data for Excel
    const worksheetData = donations.map(donation => ({
      'ID': donation.id,
      'الاسم الكامل': donation.full_name,
      'الهاتف': donation.phone,
      'المنطقة': donation.region,
      'الحي': donation.district,
      'الفئة': donation.category,
      'الحالة': donation.status,
      'تاريخ الإنشاء': new Date(donation.created_at).toLocaleDateString('ar-SA')
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Set column widths
    const colWidths = [
      { wch: 5 },  // ID
      { wch: 20 }, // Full Name
      { wch: 15 }, // Phone
      { wch: 15 }, // Region
      { wch: 15 }, // District
      { wch: 20 }, // Category
      { wch: 15 }, // Status
      { wch: 15 }  // Created At
    ];
    worksheet['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'تبرعات');

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set headers and send file
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=donations.xlsx');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
