const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/exams
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM exams ORDER BY year DESC, session');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/exams/:examId/parts
router.get('/:examId/parts', async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await db.query('SELECT * FROM parts WHERE exam_id = $1 ORDER BY order_num', [examId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
