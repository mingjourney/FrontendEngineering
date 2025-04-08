class Node {
  constructor(key) {
      this.key = key;
      this.prev = null;
      this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
      this.capacity = capacity;
      this.cache = {};
      this.length = 0;
      this.head = new Node();
      this.tail = new Node();
      this.head.next = this.tail;
      this.tail.prev = this.head;
  }

  removeNode(node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
  }

  addNodeToHead(node) {
      node.prev = this.head;
      node.next = this.head.next;
      this.head.next.prev = node;
      this.head.next = node;
  }

  moveNodeToHead(node) {
      this.removeNode(node);
      this.addNodeToHead(node);
  }

  put(key) {
      if (this.cache[key]) {
          const node = this.cache[key];
          this.moveNodeToHead(node);
      } else {
          const node = new Node(key);
          this.addNodeToHead(node);
          this.cache[key] = node;
          this.length++;
          if (this.length > this.capacity) {
              const lastNode = this.tail.prev;
              this.removeNode(lastNode);
              delete this.cache[lastNode.key];
              this.length--;
          }
      }
  }

  has(key) {
      return this.cache[key]!== undefined;
  }
}

class Pub {
  constructor() {
      this.event = {};
      this.lruCache = new LRUCache(10);
  }

  subscribe(eventName, callback) {
      if (!this.event[eventName]) {
          this.event[eventName] = [];
      }
      this.event[eventName].push(callback);
      this.lruCache.put(eventName);
      return () => {
          this.event[eventName] = this.event[eventName].filter((cb) => cb!== callback);
          if (this.event[eventName].length === 0) {
              delete this.event[eventName];
          }
      };
  }

  publish(eventName, value) {
      if (this.lruCache.has(eventName)) {
          this.lruCache.put(eventName);
          if (this.event[eventName]) {
              this.event[eventName].forEach((callback) => {
                  callback(value);
              });
          }
      }
  }
}

const pub = new Pub();

const unsubscribe1 = pub.subscribe('是否是会员', (isVip) => {
  if (isVip) {
      console.log('是会员展示会员组件');
  } else {
      console.log('不是会员隐藏会员组件');
  }
});

const unsubscribe2 = pub.subscribe('是否是会员', (isVip) => {
  if (isVip) {
      console.log('是会员跳转a');
  } else {
      console.log('不是会员跳转b');
  }
});

pub.publish('是否是会员', true);
unsubscribe2();
pub.publish('是否是会员', false);    