const unique1 = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}