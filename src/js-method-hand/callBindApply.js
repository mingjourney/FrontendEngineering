// 柯里化
const curryAdd2 = a => b => a + b;
const curryAdd3 = a => b => c => a + b + c;

Function.prototype.myCall = function(context, ...args) {
  const fn = Symbol('fn');
  context = context || globalThis;
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
}
Function.prototype.myApply = function (context, args = []) {
  const fn = Symbol('fn');
  context = context || globalThis;
  context[fn] = this;
  const res = context[fn](...args);
  delete(context[fn])
  return res;
}
Function.prototype.myBind = function(context, ...args) {
  const self = this;
  context = context || globalThis;
  return function (...newArgs) {
    // self.apply(context, [...args, ...newArgs])
    const fn = Symbol('fn');
    context[fn] = self;
    const res = context[fn](...args, ...newArgs);
    delete context[fn];
    return res;
  }
}
const Person = {
  name: '21',
  say(age, ...args) {
    console.log(this.name, '年龄' + age, args);
  }
}
const person1 = { name: 'gg' };

// Person.say.myCall(person1, 222);
// Person.say.myApply(person1, [333]);
const a = Person.say.myBind(person1, 233);
a(211);

const myNew = function(constructor, ...args) {
  const obj =  Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);
  return res instanceof 'Object' ? res : obj;
}

const curry = function(fn, firstArgs) {
  console.log('firstArgs', firstArgs);
  return function (...args) {
    return fn.apply(this, [firstArgs, ...args]);
  }
}

const dynamicAdd = function (...args) {
  return args.reduce((acc, cur) => acc + cur, 0);
}

const add1 = curry(dynamicAdd, 1);
const add1_3 = curry(add1, 3);
const add1_3_5 = curry(add1_3, 5);
console.log(add1_3_5(7));


const hyCurrying = function (fn) {
  const curriedFn = function (...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...newArgs) {
        return curriedFn(...args.concat(newArgs));
      }
    }
  }
  return curriedFn;
}
debugger;
const sumK = hyCurrying(dynamicAdd)
console.log(sumK(10)(20)(30))