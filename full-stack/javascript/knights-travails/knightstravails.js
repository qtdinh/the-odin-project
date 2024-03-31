class Graph {
  constructor() {
    this.adjList = {};
    this.moves = [
      [1, 2],
      [2, 1],
      [-1, 2],
      [1, -2],
      [-1, -2],
      [-2, 1],
      [2, -1],
      [-2, -1],
    ];
  }
  //better to use BFS, since it doesn't exhaust all options until it reaches the shortest path
  //knight may only traverse 2 moves first (hor. and vert.) and then 1 move horizontally
  //knight may not traverse in negative if it results in a negative position
  //should make a tree or graph to keep track of where the knight can move from position to position

  addEdge(u, v) {
    //create array for the position and set adjacency to such
    if (!this.adjList[u]) this.adjList[u] = [];
    this.adjList[u].push(v);
  }

  buildGraph(start, visited = new Set()) {
    //1. create root node with the start position
    //2. stop creating graph once we find a position that is the end position
    // console.log(this.adjList[[0, 0]]);
    // if (visited.has(start.toString())) {
    //   return;
    // }

    if (visited.has(start.toString())) {
      return;
    }

    visited.add(start.toString());

    //Go through each move, and given it fulfills the rules, it will add an adjacent position.
    this.moves.forEach(([x, y]) => {
      const [nx, ny] = [start[0] + x, start[1] + y];
      const newPos = [nx, ny].toString();
      if (nx >= 0 && ny >= 0 && nx < 8 && ny < 8 && !visited.has(newPos)) {
        this.addEdge(start, [nx, ny]);
      }
    });

    if (this.adjList[start]) {
      this.adjList[start].forEach(([x, y]) => {
        this.buildGraph([x, y], visited);
      });
    }

    return this.adjList[start];
  }

  knightMoves(start, end, queue = [], visited = new Set()) {
    //build graph with the root node
    this.buildGraph(start);

    queue.push([start]);

    while (queue.length > 0) {
      let path = queue.shift(); // Dequeue a node from the queue

      visited.add(path.toString());

      // gets the latest path
      const node = path[path.length - 1];

      if (node.toString() === end.toString()) {
        // If the current node is the end node, return the visited Set
        return path;
      }

      if (this.adjList[node]) {
        this.adjList[node].forEach((neighbor) => {
          const neighborStr = neighbor.toString();
          //copy path and append neighbor to it
          const newPath = [...path, neighbor];
          if (!visited.has(neighborStr)) queue.push(newPath); //if not visited, enqueue
        });
      }
    }
    return [];
  }
}

let graph = new Graph();

// console.log(graph.buildGraph([0, 0]));

graph.knightMoves([3, 3], [0, 0]).forEach((item) => {
  console.log(item);
});

// console.log(graph.buildGraph([0, 0]));
