// ... 前面的代码保持不变 ...

console.log("排序后数组:", arr);

/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {Number} delay 延迟时间，单位毫秒
 * @param {Boolean} immediate 是否立即执行
 * @returns {Function} 防抖处理后的函数
 */
function debounce(fn, delay = 300, immediate = false) {
  let timer = null;
  
  return function(...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    if (!timer && immediate) {
      fn.apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay)
    }
  }
   
}

const throttle = function (fn, delay) {
  let timer = null;
  let lastFnTime = 0;
  return function(...args) {
    const now = Date.now();
    let diff = lastFnTime;
    const context = this;
    if (diff >= delay) {
      lastFnTime = now;
      fn.apply(context, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastFnTime = Date.now();
        timer = null;
        fn.apply(context, args);
      }, delay - diff);
    }
  }
}
// 创建一个防抖版本的处理函数
const debouncedHandleInput = debounce(handleInput, 500);
