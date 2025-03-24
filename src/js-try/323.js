/**
 * 堆排序实现
 * @param {Array} arr 待排序数组
 * @returns {Array} 排序后的数组
 */
function heapSort(arr) {
  const len = arr.length;
  
  // 构建最大堆
  buildMaxHeap(arr);
  
  // 从最后一个元素开始，逐个将最大值（根节点）与当前末尾元素交换
  for (let i = len - 1; i > 0; i--) {
    // 交换根节点（最大值）与当前末尾元素
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // 重新调整堆，但不包括已排序的部分
    heapify(arr, 0, i);
  }
  
  return arr;
}

/**
 * 构建最大堆
 * @param {Array} arr 待构建的数组
 */
function buildMaxHeap(arr) {
  const len = arr.length;
  
  // 从最后一个非叶子节点开始，自底向上构建最大堆
  // 最后一个非叶子节点的索引是 Math.floor(len/2) - 1
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }
}

/**
 * 调整堆，使其满足最大堆性质
 * @param {Array} arr 待调整的数组
 * @param {Number} i 当前节点索引
 * @param {Number} len 堆的大小
 */
function heapify(arr, i, len) {
  const left = 2 * i + 1;   // 左子节点
  const right = 2 * i + 2;  // 右子节点
  let largest = i;          // 假设当前节点是最大的
  
  // 如果左子节点存在且大于当前节点
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // 如果右子节点存在且大于当前最大节点
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // 如果最大节点不是当前节点，则交换它们，并继续调整堆
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest, len);
  }
}


// 测试
const arr = [12, 11, 13, 5, 6, 7];
console.log("原始数组:", arr);
heapSort(arr);
console.log("排序后数组:", arr);


const isObject = (obj) => obj && typeof obj === 'object';
const deepClone = (obj, map = new WeakMap()) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (map.has(obj)) return map.get(obj);
  const cloneObj = Array.isArray(obj) ? [] : {};
  map.set(obj, cloneObj);
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    cloneObj[key] = deepClone(obj[key], map);
  })
  return cloneObj;
}
const flatten = (arr) => {
  if (!Array.isArray(arr)) return [arr];
  return arr.reduce((acc, cur) => {
    return [...acc, ...flatten(cur)];
  }, [])
}
const a = flatten([121,2131, [31231, 3123], [321, [32131, [32131]]]]);
console.log('a', a);