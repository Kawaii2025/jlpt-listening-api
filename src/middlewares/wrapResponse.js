// 统一响应格式中间件
module.exports = function wrapResponse(handler) {
  return async function (req, res, next) {
    // 重写 res.json
    const oldJson = res.json.bind(res);
    res.json = function (data) {
      // 如果已经是标准格式则直接返回
      if (data && typeof data === 'object' && 'status' in data && 'message' in data) {
        if (data.status === 0) {
          res.status(200);
        } else if (data.status >= 400 && data.status < 500) {
          res.status(data.status);
        } else {
          res.status(500);
        }
        return oldJson(data);
      }
      // 默认成功包装
      res.status(200);
      return oldJson({ status: 0, message: 'success', data });
    };
    try {
      await handler(req, res, next);
    } catch (err) {
      // 统一错误包装
      // 如果错误对象有 status 并且是 4xx，则用 4xx，否则 500
      if (err.status && err.status >= 400 && err.status < 500) {
        res.status(err.status);
        oldJson({ status: err.status, message: err.message || 'client error', data: null });
      } else {
        res.status(500);
        oldJson({ status: -1, message: err.message || 'error', data: null });
      }
    }
  };
};
