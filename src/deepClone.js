const isObject = (obj) => {
  const type = typeof obj;
  return obj !== null && (type === 'Object' || type === 'Function')
}
const _completeDeepClone = (target, map = new Map()) => {
  // 补全代码
  if (!isObject(target)) return target;
  if (typeof target === 'Object') {
    const cloneTarget = Array.isArray(target) ? [] : {};
    if (map.has(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    const keys = Object.keys(target);
    (keys || obj).forEach((key) => {
      cloneTarget[key] = target[key];
    })
    return cloneTarget;
  }
}
const flatten = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}