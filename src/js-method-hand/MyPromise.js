const STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
}
// #result = null;
class MyPromise {
  #result;
  #state = STATE.PENDING;
  #callbacks = [];
  constructor (executor) { 
    executor(this.#resolve.bind(this), this.#reject.bind(this));
  }
  #resolve (value) {
    this.#result = value;
    if (this.#state !== STATE.PENDING) return;
    this.#state = STATE.FULFILLED;
    queueMicrotask(() => {
      this.#callbacks.forEach(callback => callback(this.#result));
    })
  }
  #reject (value) {
    this.#result = value;
    if (this.#state !== STATE.PENDING) return;
    this.#state = STATE.REJECTED;
  }
  then(onFulFilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === STATE.PENDING) {
        this.#callbacks.push((value) => resolve(onFulFilled(value)));
      } else if (this.#state === STATE.FULFILLED) {
        queueMicrotask(() => {
          resolve(onFulFilled(this.#result));
        })
      } 
    })
  }
}
const promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
    resolve(333);
  // }, 0);
})

promise.then((result) => {
  // setTimeout(() => {
    console.log('aaa', result);
    return '111';
  // })
}).then(res => {
  console.log('bbb', res);
  return '222'
}).then(res => {
  console.log('ccc', res);
});
console.log('ar', arguments);