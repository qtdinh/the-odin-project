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

  insert(value, root = this.root) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.value) root.left = this.insert(value, root.left);
    else if (value > root.value) root.right = this.insert(value, root.right);

    return root;
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

  // levelOrder(queue = [this.root], visited = [], callback = null) {
  //   // 1. take a queue
  //   // 2. append BST to queue
  //   // 3. take the first node out and append to a variable
  //   // 4.
  //   // 4. should return an array of values
  //   if (queue.length === 0) return visited;

  //   const root = queue.shift();

  //   visited.push(root);

  //   if (root.left !== null) {
  //     queue.push(root.left);
  //   }
  //   if (root.right !== null) {
  //     queue.push(root.right);
  //   }
  //   return this.levelOrder(queue, visited);
  // }

  levelOrder(queue = [this.root], visited = [], callback = null) {
    // 1. take a queue
    // 2. append BST to queue
    // 3. take the first node out and append to a variable
    // 4.
    // 4. should return an array of values
    while (queue.length != 0) {
      const root = queue.pop();
      visited.push(root);

      if (root.left !== null) {
        queue.push(root.left);
      }
      if (root.right !== null) {
        queue.push(root.right);
      }
    }

    return visited;
  }

  inOrder(root = this.root, array = [], callback = null) {
    if (root === null) return array;

    this.inOrder(root.left, array); // Traverse left subtree
    array.push(root.value); // Visit current node
    this.inOrder(root.right, array); // Traverse right subtree

    return array;
  }

  preOrder(root = this.root, array = [], callback = null) {
    if (root === null) return array;

    array.push(root.value);
    this.preOrder(root.left, array);
    this.preOrder(root.right, array);

    return array;
  }

  postOrder(root = this.root, array = [], callback = null) {
    if (root === null) return array;

    this.postOrder(root.left, array); // Traverse left subtree
    this.postOrder(root.right, array); // Traverse right subtree
    array.push(root.value); // Visit current node

    return array;
  }

  height(node) {
    if (node === null) return 0;

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node) {
    let root = this.root;
    let depth = 0;

    while (root !== node) {
      if (root.value < node.value) {
        root = root.right;
        depth++;
      } else if (root.value > node.value) {
        root = root.left;
        depth++;
      }
    }
    return depth;
  }

  isBalanced() {
    let leftSubtree = this.height(this.root.left);
    let rightSubtree = this.height(this.root.right);

    return Math.abs(leftSubtree - rightSubtree) <= 1 ? true : false;
  }

  rebalance() {
    let newArray = this.inOrder();

    this.root = this.buildTree(newArray);
  }
}

function driverScript() {
  let BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 99, 34]);
  BST.prettyPrint(BST.root);
  console.log(BST.isBalanced());
  console.log(BST.preOrder());
  console.log(BST.inOrder());
  console.log(BST.postOrder());
  BST.insert(101);

  BST.insert(234);

  BST.insert(400);

  BST.insert(353);
  BST.insert(870);
  BST.insert(220);
  BST.prettyPrint(BST.root);
  console.log(BST.isBalanced());
  BST.rebalance();
  console.log(BST.isBalanced());
  BST.prettyPrint(BST.root);
  console.log(BST.preOrder());
  console.log(BST.inOrder());
  console.log(BST.postOrder());
}

driverScript();
// console.log(BST.levelOrder());
// BST.prettyPrint(BST.root);
