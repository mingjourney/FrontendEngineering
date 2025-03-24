// 方法1：使用递归和reduce (修复版)
const flatten = (arr) => {
  if (!Array.isArray(arr)) return [arr];
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

// 方法2：使用ES6的flat方法
const flatten2 = (arr) => {
  return arr.flat(Infinity);
}

// 方法3：使用toString和split (只适用于数字或字符串数组)
const flatten3 = (arr) => {
  return arr.toString().split(',').map(item => Number(item));
}

// 方法4：使用栈实现非递归版本
const flatten4 = (arr) => {
  const result = [];
  const stack = [...arr];
  
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  
  return result;
}

// 方法5：使用生成器函数
function* flattenGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item);
    } else {
      yield item;
    }
  }
}

const flatten5 = (arr) => {
  return [...flattenGenerator(arr)];
}

// 测试
console.log(flatten([121, 2131, [31231, 3123], [321, [32131, [32131]]]]));