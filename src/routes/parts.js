const express = require('express');
const router = express.Router();
const db = require('../db');
const safeQuery = require('../utils/safeQuery');
const toCamelCase = require('../utils/toCamelCase');

const pagedQuery = require('../middlewares/pagedQuery');

// GET /api/exams/:examId/parts  -> all parts for an exam (RESTful)
router.get('/exams/:examId/parts', async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await safeQuery(
      'SELECT * FROM parts WHERE exam_id = $1 ORDER BY order_num',
      [examId]
    );
    res.json(toCamelCase(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 兼容老接口，后续可移除
router.get('/', async (req, res) => {
  try {
    const { examId } = req.query;
    if (!examId) {
      return res.status(400).json({ error: 'examId parameter is required' });
    }
    const result = await safeQuery(
      'SELECT * FROM parts WHERE exam_id = $1 ORDER BY order_num',
      [examId]
    );
    res.json(toCamelCase(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/parts/:partId/items
router.get('/:partId/items', async (req, res) => {
  try {
    const { partId } = req.params;
    const result = await safeQuery(
      'SELECT * FROM items WHERE part_id = $1 ORDER BY order_num',
      [partId]
    );
    res.json(toCamelCase(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
