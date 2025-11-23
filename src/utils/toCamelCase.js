// 将对象的所有下划线字段转为驼峰
function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj && typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        newObj[camelKey] = toCamelCase(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

module.exports = toCamelCase;
