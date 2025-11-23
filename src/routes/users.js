const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/user_practice  body: { user_id, sentence_id }
router.post('/practice', async (req, res) => {
  try {
    const { user_id, sentence_id } = req.body;
    if (!user_id || !sentence_id) return res.status(400).json({ error: 'user_id and sentence_id required' });
    const result = await db.query(
      'INSERT INTO user_practice (user_id, sentence_id, practiced_at) VALUES ($1, $2, now()) RETURNING *',
      [user_id, sentence_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/:userId/practice
router.get('/:userId/practice', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(
      `SELECT up.id AS practice_id, up.practiced_at, s.*
       FROM user_practice up
       JOIN sentences s ON up.sentence_id = s.id
       WHERE up.user_id = $1
       ORDER BY up.practiced_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
