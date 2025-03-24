const isObject = (obj) => obj && typeof obj === 'object';

const deepClone = (obj, map = new WeakMap()) => {
  // 处理基本类型和特殊情况
  if (!isObject(obj)) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (obj instanceof Function) return obj.bind({});
  if (obj instanceof Map) {
    const cloneMap = new Map();
    map.set(obj, cloneMap);
    for (let [key, value] of obj) {
      cloneMap.set(deepClone(key, map), deepClone(value, map));
    }
    return cloneMap;
  }
  if (obj instanceof Set) {
    const cloneSet = new Set();
    map.set(obj, cloneSet);
    for (let item of obj) {
      cloneSet.add(deepClone(item, map));
    }
    return cloneSet;
  }
  
  // 处理循环引用
  if (map.has(obj)) return map.get(obj);
  
  // 创建新对象或数组
  const cloneObj = Array.isArray(obj) ? [] : {};
  map.set(obj, cloneObj);
  
  // 处理Symbol类型的键
  const allKeys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
  
  for (const key of allKeys) {
    cloneObj[key] = deepClone(obj[key], map);
  }
  
  return cloneObj;
}