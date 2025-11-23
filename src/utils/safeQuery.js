const db = require('../db');

/**
 * 包装 SQL 查询，自动加上 AND is_deleted = FALSE 或 WHERE is_deleted = FALSE
 * @param {string} sql 原始 SQL 语句
 * @param {Array} params 查询参数
 * @returns {Promise}
 */
async function safeQuery(sql, params = []) {
  let patchedSql = sql;
  
  // 判断是否已有 WHERE（忽略大小写）
  const hasWhere = /\bWHERE\b/i.test(sql);
  
  if (hasWhere) {
    // 有 WHERE，就在第一个 WHERE 后面加上 is_deleted = FALSE AND
    patchedSql = sql.replace(/(\bWHERE\b\s+)/i, '$1 is_deleted = FALSE AND ');
  } else {
    // 没有 WHERE，需要在 ORDER BY 之前插入
    // 或者在最后（如果没有 ORDER BY、GROUP BY、LIMIT 等）
    const match = sql.match(/\b(ORDER BY|GROUP BY|LIMIT|OFFSET|;)\b/i);
    
    if (match) {
      // 在第一个出现的 ORDER BY/GROUP BY/LIMIT/OFFSET 之前插入
      patchedSql = sql.replace(match[0], ` WHERE is_deleted = FALSE ${match[0]}`);
    } else {
      // 直接在末尾加
      patchedSql = sql.replace(/;?\s*$/, ' WHERE is_deleted = FALSE');
    }
  }
  
  console.log('Original SQL:', sql);
  console.log('Patched SQL:', patchedSql);
  
  return db.query(patchedSql, params);
}

module.exports = safeQuery;
