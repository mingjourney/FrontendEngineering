const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      console.log('timer1', timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
    console.log('timer12', timer);

  }
}
window.addEventListener('resize', debounce(() => console.log(11), 1000));