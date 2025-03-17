const myInstance = (left, right) => {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}