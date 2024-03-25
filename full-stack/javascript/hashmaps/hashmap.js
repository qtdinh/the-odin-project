class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.keysCount = 0;
    this.loadFactor = 0.75;
  }

  extractFromBuckets(callback) {
    const result = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        result.push(callback(bucket));
      }
    });

    return result;
  }

  getLoadFactorThreshold() {
    return this.keysCount / this.buckets.length;
  }

  resize() {
    if (this.getLoadFactorThreshold() > this.loadFactor) {
      const newCapacity = this.buckets.length * 2;
      const newBuckets = new Array(newCapacity).fill(null);

      this.entries().forEach(([key, value]) => {
        //get new index with length
        const newIndex = this.hash(key) % newCapacity;
        //add node to new array
        if (newBuckets[newIndex])
          newBuckets[newIndex].next = new Node(key, value);
        else newBuckets[newIndex] = new Node(key, value);
      });

      this.buckets = newBuckets;
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }

    // ensure array does not get too big
    return hashCode;
  }

  set(key, value) {
    if (this.buckets[this.hash(key)]) {
      // console.log(`I am the old ${value}`);
      // console.log(`I am the new ${value}`);
      this.buckets[this.hash(key)].next = new Node(key, value);
      return;
    }

    this.buckets[this.hash(key)] = new Node(key, value);
    this.keysCount++;
    this.resize();
  }

  get(key) {
    if (key < 0 || key >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    return this.buckets[this.hash(key)].value;
  }

  has(key) {
    return this.buckets[this.hash(key)] ? true : false;
  }

  remove(key) {
    if (this.buckets[this.hash(key)]) {
      this.buckets.splice(this.hash(key), 1);
      this.keysCount--;
      return true;
    }

    return false;
  }

  length() {
    return this.keysCount;
  }

  clear() {
    this.buckets = [];
    this.keysCount = 0;
  }

  keys() {
    return this.extractFromBuckets((bucket) => bucket.key);
  }

  values() {
    return this.extractFromBuckets((bucket) => bucket.value);
  }

  entries() {
    return this.extractFromBuckets((bucket) => [bucket.key, bucket.value]);
  }
}

let hashumappu = new HashMap();

hashumappu.set("Smith", 14);
hashumappu.set("Boba", 20);
hashumappu.set("Abasho", 36);

console.log(hashumappu.keys());

const pairs = hashumappu.entries();
for (const pair of pairs) {
  console.log(pair);
}
