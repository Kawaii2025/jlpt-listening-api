const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/parts/:partId/items
router.get('/:partId/items', async (req, res) => {
  try {
    const { partId } = req.params;
    const result = await db.query('SELECT * FROM items WHERE part_id = $1 ORDER BY order_num', [partId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
