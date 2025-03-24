const PromiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let completeCount = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        result[index] = res;
        completeCount++;
        if (completeCount === promises.length) resolve(result);
      }).catch(err => { 
        reject(err)
      });
    })
  })
}
const promise1 = Promise.resolve(1);
const promise2 = new Promise((resolve) => { setTimeout(() => {
  resolve(2);
  console.log('bb')
}, 3000)});
const promise3 = Promise.reject(3);
PromiseAll([promise1, promise2, promise3]).then((res) => console.log('res', res)).catch(err => console.log('err', err));