class Subject {
  constructor () {
    this.observerList = [];
  }
  registerObserver (observer) {
    this.observerList.push(observer);
  }
  removeObserver (observer) {
    const index = this.observerList.indexOf(observer);
    this.observerList.splice(index, 1);
  }
  notifyAllObserver (msg) {
    this.observerList.forEach((observer) => {
      observer.update(msg);
    })
  }
}
class Observer {
  constructor (name) {
    this.name = name;
  }
  update (msg) {
    console.log('观察者'+this.name+'收到消息', msg);
  }
}
const stuA = new Observer('gg');
const stuB = new Observer('zz');
const teacher = new Subject();
teacher.registerObserver(stuA);
teacher.registerObserver(stuB);
teacher.notifyAllObserver('上课啦');
teacher.removeObserver(stuA);
teacher.notifyAllObserver('签到啦');