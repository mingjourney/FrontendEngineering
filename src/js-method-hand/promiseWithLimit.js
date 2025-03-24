function promiseAllWithLimit(promises, maxParallel) {
  return new Promise((resolve, reject) => {
      // 存储所有请求的结果
      const results = new Array(promises.length);
      // 当前正在执行的请求数量
      let activeCount = 0;
      // 当前处理到的请求索引
      let currentIndex = 0;
      // 已经完成的请求数量
      let completedCount = 0;

      // 执行下一个请求
      function runNext() {
          if (currentIndex >= promises.length) return;
          const index = currentIndex++;
          const promise = promises[index];
          activeCount++;
          promise
            .then((result) => {
                  results[index] = result;
                  completedCount++;
                  activeCount--;
                  // 尝试执行下一个请求
                  runNext();
                  if (completedCount === promises.length) {
                      resolve(results);
                  }
              })
            .catch((error) => {
                  reject(error);
              });
      }

      // 启动初始的并行请求
      for (let i = 0; i < Math.min(maxParallel, promises.length); i++) {
          runNext();
      }
  });
}

// 示例使用
const requests = Array.from({ length: 1000 }, (_, index) => {
  return new Promise((resolve) => {
      // 模拟异步请求
      setTimeout(() => {
          resolve(index);
      }, Math.random() * 1000);
  });
});

const maxParallel = 10;
promiseAllWithLimit(requests, maxParallel)
.then((results) => {
      console.log('所有请求完成，结果：', results);
  })
.catch((error) => {
      console.error('有请求失败：', error);
  });