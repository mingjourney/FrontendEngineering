// 创建一个Web Worker
const worker = new Worker('worker.js');

// 向Web Worker发送任务数据
worker.postMessage({ task: 'processData', data: largeDataArray });

// 接收Web Worker的结果
worker.onmessage = function (event) {
    console.log('Result from worker:', event.data);
};

self.onmessage = function (event) {
  if (event.data.task === 'processData') {
      // 处理数据的逻辑，这里可以是执行100万个任务的一部分
      const result = processLargeData(event.data.data);
      self.postMessage(result);
  }
};

async function processTasks() {
  const tasks = [];
  for (let i = 0; i < 1000000; i++) {
      tasks.push(new Promise((resolve) => {
          // 模拟一个异步任务，这里使用setTimeout来模拟异步操作
          setTimeout(() => {
              // 执行任务的逻辑
              const result = i * 2;
              resolve(result);
          }, 0);
      }));
  }
  const results = await Promise.all(tasks);
  console.log('All tasks completed:', results);
}
processTasks();