const isObject = (target) => typeof target === 'object' && target!== null;

const _completeDeepClone = (target, map = new WeakMap()) => {
    if (!isObject(target)) return target;

    if (target instanceof Date) {
        return new Date(target.getTime());
    }
    if (target instanceof RegExp) {
        return new RegExp(target);
    }

    const cloneTarget = Array.isArray(target)? [] : {};

    if (map.has(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    const keys = Object.keys(target);
    keys.forEach((key) => {
        cloneTarget[key] = _completeDeepClone(target[key], map);
    });

    return cloneTarget;
};

// 测试代码
const obj = {
    a: 1,
    b: { c: 2 },
    e: [1, 3, 4, [2, 442, 321]],
    d: new Date()
};
const clonedObj = _completeDeepClone(obj);
console.log(clonedObj);
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