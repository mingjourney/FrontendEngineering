const arr = [1, 2, 3]
// arr.reduce((p, x) => p.then(() => new Promise(r => setTimeout(() => r(console.log(x)), 1000))), Promise.resolve());
const light = (timer, cb) => {
  return new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer)
  })
}
const step = () => {
  Promise.resolve().then(() => {
    return light(1000, () => console.log('red'));
  }).then(() => {
    return light(2000, () => console.log('green'));
  }).then(() => {
    return light(3000, () => console.log('yellow'));
  }).then(() => {
    return step();
  })
}
step()