const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/items/:itemId  -> item detail
router.get('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const result = await db.query('SELECT * FROM items WHERE id = $1', [itemId]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/items/:itemId/choices
router.get('/:itemId/choices', async (req, res) => {
  try {
    const { itemId } = req.params;
    const result = await db.query('SELECT * FROM choices WHERE item_id = $1 ORDER BY order_num', [itemId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/items/:itemId/sentences
router.get('/:itemId/sentences', async (req, res) => {
  try {
    const { itemId } = req.params;
    const result = await db.query('SELECT * FROM sentences WHERE item_id = $1 ORDER BY order_num', [itemId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
