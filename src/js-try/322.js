const a = [7, 43, 1, 43, 3, 6, 21, 214, 4323];
const heapify = (arr, index, len) => {
  let largest = index;
  const left = index * 2 + 1;
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  const right = index * 2 + 2;
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== index) {
    [arr[largest], arr[index]] = [arr[index], arr[largest]];
    heapify(arr, largest, len)
  }
}
const heap = (arr) => {
  const len = arr.length
  for (let j = Math.floor((len - 1) / 2); j >= 0; j--) {
    heapify(arr, j, len);
  }
  for (let j = arr.length - 1; j >= 0; j--) {
    [arr[0], arr[j]] = [arr[j], arr[0]];
    heapify(arr, 0, j);
  }
}
heap(a);
console.log('arr', a.join(', '))