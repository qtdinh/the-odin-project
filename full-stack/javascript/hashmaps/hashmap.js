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
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    // ensure array does not get too big
    return hashCode % this.buckets.length;
  }

  set(key, value) {
    // if (this.buckets[this.hash(key)]) {
    //   console.log(`I am the old ${value}`);
    //   console.log(`I am the new ${value}`);
    // }

    this.buckets[this.hash(key)] = new Node(key, value);
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
      return true;
    }

    return false;
  }

  length() {
    let keysCount = 0;
    for (let key in this.buckets) {
      if (this.buckets.hasOwnProperty(key)) {
        keysCount++;
      }
    }
    return keysCount;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    const indexes = [];

    this.buckets.forEach((bucket) => {
      if (bucket !== null) indexes.push(bucket.key);
    });
    return indexes;
  }

  values() {
    const vals = [];

    this.buckets.forEach((bucket) => {
      if (bucket !== null) vals.push(bucket.value);
    });
    return vals;
  }

  entries() {
    const pairs = [];

    this.buckets.forEach((bucket) => {
      if (bucket !== null) pairs.push([bucket.key, bucket.value]);
    });
    return pairs;
  }
}

let hashumappu = new HashMap();

hashumappu.set("Smith", 14);
hashumappu.set("Boba", 20);
hashumappu.set("Abasho", 36);

const pairs = hashumappu.entries();
for (const pair of pairs) {
  console.log(pair);
}
