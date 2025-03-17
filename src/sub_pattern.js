class Pub {
  constructor () {
    this.event = {};
  }

  subscribe (eventName, cb) {
    if (!this.event[eventName]) {
      this.event[eventName] = [];
    }
    this.event[eventName].push(cb);
    return () => this.event[eventName] = this.event[eventName].filter((callBack) => callBack !== cb);
  }

  publish (eventName, msg) {
    this.event[eventName].forEach(cb => cb(msg));
  }
}

const pub = new Pub();
const unSubscribe1 = pub.subscribe('weather', (msg) => {
  console.log('收到天气啦 msg'+ msg);
})
const unSubscribe2 = pub.subscribe('weather', (msg) => {
  console.log('天气dd'+ msg);
})
pub.publish('weather', '下雨了');
unSubscribe1();
pub.publish('weather', '天晴了');

