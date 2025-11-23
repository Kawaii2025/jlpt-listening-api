const express = require('express');
const router = express.Router();
const db = require('../db');
const safeQuery = require('../utils/safeQuery');
const toCamelCase = require('../utils/toCamelCase');

const pagedQuery = require('../middlewares/pagedQuery');
// GET /api/exams
router.get(
  '/',
  pagedQuery(async (req, res) => {
    const { page, pageSize } = req._pagination;
    try {
      const result = await safeQuery(
        'SELECT * FROM exams ORDER BY year DESC, session OFFSET $1 LIMIT $2',
        [(page - 1) * pageSize, pageSize]
      );
      res.json({ page, pageSize, data: toCamelCase(result.rows) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  })
);

// GET /api/exams/:examId/parts
router.get('/:examId/parts', async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await safeQuery(
      `SELECT * FROM parts 
       WHERE exam_id = $1 AND is_deleted = FALSE 
       ORDER BY order_num`,
      [examId]
    );
    res.json(toCamelCase(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
