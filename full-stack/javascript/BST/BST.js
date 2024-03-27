class Node {
  constructor(value) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array) || null;
  }

  sort(array) {
    // remove duplicates and sort in numerical order
    return [...new Set(array)].sort((a, b) => a - b);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    array = this.sort(array);

    const mid = parseInt((start + end) / 2);

    if (mid > array.length - 1 || start > end) return null;

    const root = new Node(array[mid]);
    // 1. 4
    // console.log("root", root);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    //acts as a reference variable
    let root = this.root;

    while (root.left !== null || root.right !== null) {
      if (value < root.value) root = root.left;
      else root = root.right;
    }

    if (value < root.value) root.left = new Node(value);
    else if (value > root.value) root.right = new Node(value);
  }

  deleteItem(value, root = this.root) {
    //1. check when a node has children or not
    // if it does, its children need to be adjusted
    // set the inorder successor to replace the value
    // if not, simply delete
    //2. if tree does not exist
    // throw an error
    //3. if a node with the value does not exist
    // throw an error

    if (root === null) return root;

    // recursive calls
    if (root.value > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.value < value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      // case 1. no children
      if (root.left === null && root.right === null) {
        root = null;
        // case 2. single children
      } else if (root.left === null) {
        root = root.right;
      } else if (root.right === null) {
        root = root.left;
        // case 2. double children
      } else if (root.right && root.left) {
        let successor = root.left;
        successor.right = root.right;

        root = successor;
      }
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null || root.value === value) return root;

    if (root.value > value) {
      return this.find(value, root.left);
    } else if (root.value < value) {
      return this.find(value, root.right);
    }
  }

  levelOrder(queue = [this.root], visited = []) {
    // 1. take a queue
    // 2. append node visited to the queue
    // 3. as we go through the nodes in the queue, add the node's unvisited neighbors to the queue
    // 4. should return an array of values
    if (queue.length === 0) return visited;

    const root = queue.shift();

    visited.push(root.value);

    // if (queue.length === 0) {
    //   queue.push(root);
    //   visited.push(root.value);
    // }

    if (root.left !== null) {
      queue.push(root.left);
    }
    if (root.right !== null) {
      queue.push(root.right);
    }
    return this.levelOrder(queue, visited);
  }
}

let BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
BST.prettyPrint(BST.root);
console.log(BST.levelOrder());

// BST.prettyPrint(BST.root);
