// 分页包装器中间件
module.exports = function pagedQuery(handler) {
  return async function (req, res, next) {
    // 默认分页参数
    let page = parseInt(req.query.page, 10) || 1;
    let pageSize = parseInt(req.query.pageSize, 10) || 20;
    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = 20;
    req._pagination = { page, pageSize };
    return handler(req, res, next);
  };
};
