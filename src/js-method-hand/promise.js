const promise1 = new Promise((resolve, reject) => {
  resolve('success');
})
console.log('promise1', promise1)
promise1.then((res) => console.log('res', res, promise1));
console.log('promise1', promise1)
// class Promise