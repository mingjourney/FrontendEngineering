
const myG = function (name, age) {
  this.name = name;
  this.age = age;
}
// const a = new myG('g', 24);
// console.log('a', a);
const myNew = function (constructor, ...args) {
  // const obj = Object.create(constructor.prototype);
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, args);
  return (result && typeof result === 'Object') ? result : obj;
}
// const g = myNew(myG, 'g', 23);
// console.log('g', g);


const myInstance = function (left, right) {
  let proto = Object.getPrototypeOf(left);
  const { prototype } = right;
  while (1) {
    console.log('proto', proto, 'prototype', prototype);
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);;
  }
}
myInstance({}, Object);

