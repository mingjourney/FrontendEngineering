const withTimning = (fn) => {
  return async (...args) => {
    const startTime = Date.now();
    const result = await fn(...args);
    const endTime = Date.now();
    const timeCost = endTime - startTime;
    console.log(`${fn.name}  用时 ${timeCost} 毫秒`);
    return result;
  }
}
const sendAdd = async (a, b) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000)
  })
}
const add1 = async (...nums) => {
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result = await sendAdd(result, nums[i]);
  }
  return result;
}
const add2 = async (...nums) => {
  const pairsAdd = async (numbers) => {
    if (numbers.length === 1) return numbers[0];
    const promises = [];
    for (let i = 0; i < numbers.length; i += 2) {
      if (i + 1 < numbers.length) {
        promises.push(sendAdd(numbers[i], numbers[i + 1]))
      } else {
        promises.push(Promise.resolve(numbers[i]));
      }
    }
    const results = await Promise.all(promises);
    return pairsAdd(results);
  }
  const results = await pairsAdd(nums);
  return results;
}
const timedAdd1 = withTimning(add1);
const timedAdd2 = withTimning(add2);

const arr = Array.from({ length: 10 }, (_, index) => index);
timedAdd1(...arr).then(res => console.log('计算结果', res));
timedAdd2(...arr).then(res => console.log('计算结果', res));
