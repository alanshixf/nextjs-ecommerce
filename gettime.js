// Unix 时间戳
const timestamp = 1699072393;

// 创建一个日期对象
const date = new Date(timestamp * 1000); // 注意乘以1000，因为 JavaScript 使用毫秒

// 获取日期和时间
const year = date.getFullYear();
const month = date.getMonth() + 1; // 月份从0开始，所以要加1
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
