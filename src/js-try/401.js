const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
}) 
console.log('promise', promise);
setTimeout(() => {
  console.log('promise-2', promise);
}, 2000)