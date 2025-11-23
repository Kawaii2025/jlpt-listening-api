const express = require('express');
const router = express.Router();
const db = require('../db');

const pagedQuery = require('../middlewares/pagedQuery');
const toCamelCase = require('../utils/toCamelCase');
// const wrapResponse = require('../middlewares/wrapResponse');
// GET /api/sentences?itemId=xxx
router.get('/', pagedQuery(async (req, res) => {
  const { itemId } = req.query;
  const { page, pageSize } = req._pagination;
  let result;
  if (itemId) {
    result = await db.query(
      'SELECT * FROM sentences WHERE item_id = $1 ORDER BY order_num OFFSET $2 LIMIT $3',
      [itemId, (page - 1) * pageSize, pageSize]
    );
  } else {
    result = await db.query(
      'SELECT * FROM sentences ORDER BY item_id, order_num OFFSET $1 LIMIT $2',
      [(page - 1) * pageSize, pageSize]
    );
  }
  res.json({ page, pageSize, data: toCamelCase(result.rows) });
}));

module.exports = router;
