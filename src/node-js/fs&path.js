const path = require('node:path');
// const fs = require('node:fs');
const fs = require('node:fs/promises');
console.log(__dirname);
console.log(path.resolve(__dirname, './1.js'));
// const buffer = fs.readFileSync(path.resolve(__dirname, './1.js'));
// console.log('buffer', buffer.toString());
// fs.readFile(path.resolve(__dirname, './1.js'), (err, buffer) => {console.log('buffer1', buffer.toString())});
fs.readFile(path.resolve(__dirname, './1.js'))
  .then((buffer) => {
    console.log('buffer2', buffer);
  })
  .catch(err => console.log('err', err));
(async () => {
  try {
    const buffer = await fs.readFile(path.resolve(__dirname, './1.js'));
    console.log('buffer3', buffer.toString());
  } catch (err) {
    console.log('err', err);
  }
})();
// fs.readFile() 读取文件
(async () => {
  const buffer = await fs.readFile(path.resolve(__dirname, './1.js'))
  return fs.appendFile(path.resolve(__dirname, '3.js'), buffer);
})();
fs.readFile(path.resolve(__dirname, './1.js')).then((buffer) => {
  return fs.appendFile(path.resolve(__dirname, '2.js'), buffer);
});
// fs.mkdir() 创建目录
// fs.rmdir() 删除目录
// fs.rmdir() 删除目录
