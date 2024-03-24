import { Node } from "./node.js";

class LinkedList {
  constructor(head) {
    this.listHead = null;
    this.nodesCount = 0;
  }

  append(value) {
    // check if list is empty
    if (!this.listHead) {
      this.prepend(value);
      return;
    } else {
      let temp = this.listHead;
      while (temp.nextNode != null) temp = temp.nextNode;
      temp.nextNode = new Node(value);
    }
    this.nodesCount++;
    return;
  }

  prepend(value) {
    //if empty, simply add
    if (!this.listHead) {
      this.listHead = new Node(value);
    } else {
      let temp = new Node(value);
      temp.nextNode = this.listHead;
      this.listHead = temp;
    }
    this.nodesCount++;
    return;
  }

  size() {
    return this.nodesCount;
  }

  head() {
    return this.listHead;
  }

  tail() {
    let currentNode = this.listHead;

    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  at(index) {
    let currentNode = this.listHead;

    for (let i = 0; i < index; i++) {
      if (currentNode.nextNode === null) {
        return "Node at index does not exist";
      }
      currentNode = currentNode.nextNode;
    }

    return currentNode;
  }

  pop() {
    if (!this.listHead) return;

    let currentNode = this.listHead;
    let previous = null;

    while (currentNode.nextNode) {
      // store previous node
      previous = currentNode;
      // traverse through the list
      currentNode = currentNode.nextNode;
    }

    // edge case: there's only one node, delete that one node
    if (!previous) this.listHead = null;
    else previous.nextNode = null; //if not, then delete the last element
  }

  contains(value) {
    if (!this.listHead) return false;

    let currentNode = this.listHead;

    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    if (!this.listHead) return null;

    let currentNode = this.listHead;
    let index = 0;

    while (currentNode) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
      index++;
    }

    return null;
  }

  toString() {
    let currentNode = this.listHead;
    let printOut = `(${currentNode.value})`;
    while (currentNode) {
      currentNode = currentNode.nextNode;
      if (currentNode != null) printOut += ` -> (${currentNode.value})`;
      else printOut += ` -> null`;
    }
    console.log(printOut);
  }
}

let list = new LinkedList();
list.append(3);
list.append(5);
list.append(6);
list.prepend(4);
list.toString();
// console.log(list.size());
// console.log(list.head());
// console.log(list.tail());
// console.log(list.at(3));
list.pop();
console.log(list.contains(3));
list.toString();
console.log(list.find(3));
console.log(list.find(4));
console.log(list.find(5));
console.log(list.find(6));
