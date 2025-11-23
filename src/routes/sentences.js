const express = require('express');
const router = express.Router();
const db = require('../db');
const safeQuery = require('../utils/safeQuery');

const pagedQuery = require('../middlewares/pagedQuery');
const toCamelCase = require('../utils/toCamelCase');
// const wrapResponse = require('../middlewares/wrapResponse');
// GET /api/sentences?itemId=xxx (必须)



module.exports = router;
