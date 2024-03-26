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

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);

    const root = new Node(array[mid]);
    // 1. 4

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
}

let BST = new Tree([1, 2, 3, 4, 5, 6]);

BST.prettyPrint(BST.root);
BST.insert(7);
console.log(BST.root);

BST.prettyPrint(BST.root);
