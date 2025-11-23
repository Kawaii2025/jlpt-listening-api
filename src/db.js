const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || '';
const useSSL = process.env.DATABASE_SSL === 'true';

const pool = new Pool({
  connectionString,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
