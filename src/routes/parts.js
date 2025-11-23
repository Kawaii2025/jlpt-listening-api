const express = require('express');
const router = express.Router();
const db = require('../db');
const toCamelCase = require('../utils/toCamelCase');

const pagedQuery = require('../middlewares/pagedQuery');
// GET /api/parts
router.get('/', pagedQuery(async (req, res) => {
  const { page, pageSize } = req._pagination;
  try {
    const result = await db.query(
      'SELECT * FROM parts ORDER BY id OFFSET $1 LIMIT $2',
      [(page - 1) * pageSize, pageSize]
    );
  res.json({ page, pageSize, data: toCamelCase(result.rows) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}));

// GET /api/parts/:partId/items
router.get('/:partId/items', async (req, res) => {
  try {
    const { partId } = req.params;
    const result = await db.query('SELECT * FROM items WHERE part_id = $1 ORDER BY order_num', [partId]);
  res.json(toCamelCase(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
