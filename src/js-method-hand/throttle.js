function throttle (fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  }
}

function exampleFunction() {
  console.log('函数被调用了');
}

const throttledFunction = throttle(exampleFunction, 1000);

// 模拟高频触发
window.addEventListener('resize', throttledFunction);