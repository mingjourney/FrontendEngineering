// 模拟一个大数组
const bigArray = Array.from({ length: 100000 }, (_, i) => i);
// 每个块的大小
const chunkSize = 1000;
// 当前处理的索引
let index = 0;

// 处理每个块的函数
function processChunk(chunk) {
    return chunk.map(item => item * 2);
}

function processArrayWithRAF() {
    function processChunkWithRAF() {
        // 从大数组中截取当前块
        const chunk = bigArray.slice(index, index + chunkSize);
        // 处理当前块
        const result = processChunk(chunk);
        console.log('Processed chunk:', result);
        // 更新索引
        index += chunkSize;
        // 如果还有数据未处理，继续请求下一帧处理
        if (index < bigArray.length) {
            requestAnimationFrame(processChunkWithRAF);
        }
    }
    // 开始处理
    requestAnimationFrame(processChunkWithRAF);
}

// 调用函数开始处理数组
processArrayWithRAF();
    