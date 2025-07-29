import React, { useState } from 'react';

const DataStructures = () => {
  const [activeSection, setActiveSection] = useState(null);

  const treeStructures = [
    {
      title: 'Binary Tree Basics',
      code: `// Binary Tree Node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Binary Tree Operations
public class BinaryTree {
    TreeNode root;
    
    // Insert a node (level order)
    public void insert(int val) {
        if (root == null) {
            root = new TreeNode(val);
            return;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            
            if (current.left == null) {
                current.left = new TreeNode(val);
                break;
            } else {
                queue.offer(current.left);
            }
            
            if (current.right == null) {
                current.right = new TreeNode(val);
                break;
            } else {
                queue.offer(current.right);
            }
        }
    }
}`,
      useCases: [
        'Expression trees in compilers',
        'Decision trees in AI',
        'File system hierarchies',
        'HTML DOM structure'
      ]
    },
    {
      title: 'Tree Traversals',
      code: `// Tree Traversal Methods
public class TreeTraversal {
    
    // 1. Inorder Traversal (Left -> Root -> Right)
    public void inorderTraversal(TreeNode root) {
        if (root != null) {
            inorderTraversal(root.left);
            System.out.print(root.val + " ");
            inorderTraversal(root.right);
        }
    }
    
    // 2. Preorder Traversal (Root -> Left -> Right)
    public void preorderTraversal(TreeNode root) {
        if (root != null) {
            System.out.print(root.val + " ");
            preorderTraversal(root.left);
            preorderTraversal(root.right);
        }
    }
    
    // 3. Postorder Traversal (Left -> Right -> Root)
    public void postorderTraversal(TreeNode root) {
        if (root != null) {
            postorderTraversal(root.left);
            postorderTraversal(root.right);
            System.out.print(root.val + " ");
        }
    }
    
    // 4. Level Order Traversal (BFS)
    public void levelOrderTraversal(TreeNode root) {
        if (root == null) return;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            System.out.print(current.val + " ");
            
            if (current.left != null) {
                queue.offer(current.left);
            }
            if (current.right != null) {
                queue.offer(current.right);
            }
        }
    }
    
    // Iterative Inorder using Stack
    public List<Integer> inorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        
        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        
        return result;
    }
}`,
      useCases: [
        'Binary Search Tree operations',
        'Expression evaluation',
        'Finding tree properties',
        'Tree serialization/deserialization'
      ]
    },
    {
      title: 'Binary Search Tree (BST)',
      code: `public class BST {
    TreeNode root;
    
    // Insert a value
    public TreeNode insert(TreeNode root, int val) {
        if (root == null) {
            return new TreeNode(val);
        }
        
        if (val < root.val) {
            root.left = insert(root.left, val);
        } else if (val > root.val) {
            root.right = insert(root.right, val);
        }
        
        return root;
    }
    
    // Search for a value
    public boolean search(TreeNode root, int val) {
        if (root == null) {
            return false;
        }
        
        if (val == root.val) {
            return true;
        } else if (val < root.val) {
            return search(root.left, val);
        } else {
            return search(root.right, val);
        }
    }
    
    // Delete a node
    public TreeNode delete(TreeNode root, int val) {
        if (root == null) return null;
        
        if (val < root.val) {
            root.left = delete(root.left, val);
        } else if (val > root.val) {
            root.right = delete(root.right, val);
        } else {
            // Node to be deleted found
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }
            
            // Node with two children
            root.val = findMin(root.right);
            root.right = delete(root.right, root.val);
        }
        
        return root;
    }
    
    private int findMin(TreeNode root) {
        while (root.left != null) {
            root = root.left;
        }
        return root.val;
    }
    
    // Validate BST
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
}`,
      useCases: [
        'Efficient searching in sorted data',
        'Database indexing',
        'Expression parsing',
        'Auto-complete systems'
      ]
    }
  ];

  const graphStructures = [
    {
      title: 'Graph Representation',
      code: `// 1. Adjacency List Representation
class Graph {
    private int V; // Number of vertices
    private ArrayList<ArrayList<Integer>> adj;
    
    public Graph(int V) {
        this.V = V;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    // Add an edge
    public void addEdge(int u, int v) {
        adj.get(u).add(v);
        // For undirected graph, add the reverse edge too
        // adj.get(v).add(u);
    }
    
    // Print the graph
    public void printGraph() {
        for (int i = 0; i < V; i++) {
            System.out.print("Vertex " + i + ":");
            for (int j : adj.get(i)) {
                System.out.print(" -> " + j);
            }
            System.out.println();
        }
    }
}

// 2. Adjacency Matrix Representation
class GraphMatrix {
    private int V;
    private int[][] adj;
    
    public GraphMatrix(int V) {
        this.V = V;
        adj = new int[V][V];
    }
    
    public void addEdge(int u, int v) {
        adj[u][v] = 1;
        // For undirected graph
        // adj[v][u] = 1;
    }
    
    public boolean hasEdge(int u, int v) {
        return adj[u][v] == 1;
    }
}

// 3. Weighted Graph using Adjacency List
class WeightedGraph {
    class Edge {
        int dest;
        int weight;
        
        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    private int V;
    private ArrayList<ArrayList<Edge>> adj;
    
    public WeightedGraph(int V) {
        this.V = V;
        adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int u, int v, int weight) {
        adj.get(u).add(new Edge(v, weight));
        // For undirected graph
        // adj.get(v).add(new Edge(u, weight));
    }
}`,
      useCases: [
        'Social networks (friend connections)',
        'Computer networks (router connections)',
        'Maps and navigation systems',
        'Dependency resolution systems'
      ]
    },
    {
      title: 'Graph Traversal - DFS',
      code: `public class GraphDFS {
    private ArrayList<ArrayList<Integer>> adj;
    private boolean[] visited;
    
    // Depth-First Search (Recursive)
    public void DFS(int v) {
        visited[v] = true;
        System.out.print(v + " ");
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                DFS(neighbor);
            }
        }
    }
    
    // DFS for entire graph (handles disconnected components)
    public void DFSComplete() {
        visited = new boolean[adj.size()];
        
        for (int i = 0; i < adj.size(); i++) {
            if (!visited[i]) {
                DFS(i);
            }
        }
    }
    
    // Iterative DFS using Stack
    public void DFSIterative(int start) {
        visited = new boolean[adj.size()];
        Stack<Integer> stack = new Stack<>();
        
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int v = stack.pop();
            
            if (!visited[v]) {
                visited[v] = true;
                System.out.print(v + " ");
                
                // Add neighbors in reverse order for same result as recursive
                for (int i = adj.get(v).size() - 1; i >= 0; i--) {
                    int neighbor = adj.get(v).get(i);
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }
    
    // Applications of DFS
    
    // 1. Detect Cycle in Directed Graph
    public boolean hasCycleDirected() {
        int V = adj.size();
        boolean[] visited = new boolean[V];
        boolean[] recStack = new boolean[V];
        
        for (int i = 0; i < V; i++) {
            if (hasCycleUtil(i, visited, recStack)) {
                return true;
            }
        }
        return false;
    }
    
    private boolean hasCycleUtil(int v, boolean[] visited, boolean[] recStack) {
        visited[v] = true;
        recStack[v] = true;
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor] && hasCycleUtil(neighbor, visited, recStack)) {
                return true;
            } else if (recStack[neighbor]) {
                return true;
            }
        }
        
        recStack[v] = false;
        return false;
    }
    
    // 2. Topological Sort
    public List<Integer> topologicalSort() {
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[adj.size()];
        
        for (int i = 0; i < adj.size(); i++) {
            if (!visited[i]) {
                topologicalSortUtil(i, visited, stack);
            }
        }
        
        List<Integer> result = new ArrayList<>();
        while (!stack.isEmpty()) {
            result.add(stack.pop());
        }
        return result;
    }
    
    private void topologicalSortUtil(int v, boolean[] visited, Stack<Integer> stack) {
        visited[v] = true;
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                topologicalSortUtil(neighbor, visited, stack);
            }
        }
        
        stack.push(v);
    }
}`,
      useCases: [
        'Finding connected components',
        'Detecting cycles in graphs',
        'Topological sorting',
        'Maze solving algorithms'
      ]
    },
    {
      title: 'Graph Traversal - BFS',
      code: `public class GraphBFS {
    private ArrayList<ArrayList<Integer>> adj;
    
    // Breadth-First Search
    public void BFS(int start) {
        boolean[] visited = new boolean[adj.size()];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int v = queue.poll();
            System.out.print(v + " ");
            
            for (int neighbor : adj.get(v)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
    
    // BFS for entire graph (handles disconnected components)
    public void BFSComplete() {
        boolean[] visited = new boolean[adj.size()];
        
        for (int i = 0; i < adj.size(); i++) {
            if (!visited[i]) {
                BFSComponent(i, visited);
            }
        }
    }
    
    private void BFSComponent(int start, boolean[] visited) {
        Queue<Integer> queue = new LinkedList<>();
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int v = queue.poll();
            System.out.print(v + " ");
            
            for (int neighbor : adj.get(v)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
    
    // Applications of BFS
    
    // 1. Shortest Path in Unweighted Graph
    public int[] shortestPath(int start) {
        int[] distance = new int[adj.size()];
        Arrays.fill(distance, -1);
        
        Queue<Integer> queue = new LinkedList<>();
        distance[start] = 0;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int v = queue.poll();
            
            for (int neighbor : adj.get(v)) {
                if (distance[neighbor] == -1) {
                    distance[neighbor] = distance[v] + 1;
                    queue.offer(neighbor);
                }
            }
        }
        
        return distance;
    }
    
    // 2. Check if Graph is Bipartite
    public boolean isBipartite() {
        int[] color = new int[adj.size()];
        Arrays.fill(color, -1);
        
        for (int i = 0; i < adj.size(); i++) {
            if (color[i] == -1) {
                if (!isBipartiteUtil(i, color)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    private boolean isBipartiteUtil(int start, int[] color) {
        Queue<Integer> queue = new LinkedList<>();
        color[start] = 0;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int v = queue.poll();
            
            for (int neighbor : adj.get(v)) {
                if (color[neighbor] == -1) {
                    color[neighbor] = 1 - color[v];
                    queue.offer(neighbor);
                } else if (color[neighbor] == color[v]) {
                    return false; // Same color for adjacent vertices
                }
            }
        }
        return true;
    }
    
    // 3. Level Order Traversal with Levels
    public void levelOrderTraversal(int start) {
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[adj.size()];
        
        queue.offer(start);
        visited[start] = true;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            System.out.print("Level: ");
            
            for (int i = 0; i < size; i++) {
                int v = queue.poll();
                System.out.print(v + " ");
                
                for (int neighbor : adj.get(v)) {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        queue.offer(neighbor);
                    }
                }
            }
            System.out.println();
        }
    }
}`,
      useCases: [
        'Shortest path in unweighted graphs',
        'Level-wise processing',
        'Finding minimum spanning tree',
        'Social network analysis (degrees of separation)'
      ]
    },
    {
      title: 'Advanced Graph Algorithms',
      code: `// Dijkstra's Algorithm for Shortest Path
public class Dijkstra {
    class Edge {
        int dest, weight;
        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    class Node implements Comparable<Node> {
        int vertex, distance;
        Node(int vertex, int distance) {
            this.vertex = vertex;
            this.distance = distance;
        }
        
        public int compareTo(Node other) {
            return Integer.compare(this.distance, other.distance);
        }
    }
    
    public int[] dijkstra(List<List<Edge>> graph, int start) {
        int V = graph.size();
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.offer(new Node(start, 0));
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.vertex;
            
            if (current.distance > dist[u]) continue;
            
            for (Edge edge : graph.get(u)) {
                int v = edge.dest;
                int weight = edge.weight;
                
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.offer(new Node(v, dist[v]));
                }
            }
        }
        
        return dist;
    }
}

// Union-Find (Disjoint Set Union) for Kruskal's Algorithm
public class UnionFind {
    private int[] parent, rank;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }
    
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return false;
        
        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        
        return true;
    }
}

// Kruskal's Algorithm for Minimum Spanning Tree
public class KruskalMST {
    class Edge implements Comparable<Edge> {
        int src, dest, weight;
        
        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }
        
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }
    
    public List<Edge> kruskalMST(int V, List<Edge> edges) {
        Collections.sort(edges);
        UnionFind uf = new UnionFind(V);
        List<Edge> mst = new ArrayList<>();
        
        for (Edge edge : edges) {
            if (uf.union(edge.src, edge.dest)) {
                mst.add(edge);
                if (mst.size() == V - 1) break;
            }
        }
        
        return mst;
    }
}`,
      useCases: [
        'Finding shortest paths with weights',
        'Network routing protocols',
        'Minimum spanning tree problems',
        'Social network clustering'
      ]
    }
  ];

  const complexityComparison = [
    { structure: 'Array', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
    { structure: 'Linked List', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
    { structure: 'Stack', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
    { structure: 'Queue', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
    { structure: 'Binary Tree', access: 'O(n)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
    { structure: 'BST (Balanced)', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
    { structure: 'Heap', access: 'O(n)', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
    { structure: 'Hash Table', access: 'O(1)*', search: 'O(1)*', insert: 'O(1)*', delete: 'O(1)*', space: 'O(n)' }
  ];

  return (
    <div className="fade-in">
      <div className="card">
        <h1>🌳 Data Structures - Trees & Graphs</h1>
        <p>Master advanced data structures essential for coding interviews and real-world applications.</p>
      </div>

      <div className="card">
        <h2>📊 Data Structure Complexity Comparison</h2>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
            <thead>
              <tr style={{backgroundColor: '#f8f9fa'}}>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Data Structure</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Access</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Search</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Insert</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Delete</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Space</th>
              </tr>
            </thead>
            <tbody>
              {complexityComparison.map((row, index) => (
                <tr key={index}>
                  <td style={{padding: '12px', border: '1px solid #ddd', fontWeight: 'bold'}}>{row.structure}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.access}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.search}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.insert}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.delete}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
          * Average case for hash table. Worst case can be O(n).
        </p>
      </div>

      <div className="card">
        <h2>🌳 Tree Data Structures</h2>
        {treeStructures.map((tree, index) => (
          <div key={index} style={{marginBottom: '25px'}}>
            <h3>{tree.title}</h3>
            <div className="code-block">
              <pre>{tree.code}</pre>
            </div>
            <h4>Common Use Cases:</h4>
            <ul>
              {tree.useCases.map((useCase, idx) => (
                <li key={idx}>{useCase}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🕸️ Graph Data Structures</h2>
        {graphStructures.map((graph, index) => (
          <div key={index} style={{marginBottom: '25px'}}>
            <h3>{graph.title}</h3>
            <div className="code-block">
              <pre>{graph.code}</pre>
            </div>
            <h4>Common Use Cases:</h4>
            <ul>
              {graph.useCases.map((useCase, idx) => (
                <li key={idx}>{useCase}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🎯 When to Use Which Data Structure</h2>
        <div className="grid-2">
          <div>
            <h3>🌳 Trees</h3>
            <ul>
              <li><strong>Binary Tree:</strong> Hierarchical data, expression parsing</li>
              <li><strong>BST:</strong> Sorted data with fast search/insert</li>
              <li><strong>Heap:</strong> Priority-based operations</li>
              <li><strong>Trie:</strong> String matching, auto-complete</li>
            </ul>
          </div>
          <div>
            <h3>🕸️ Graphs</h3>
            <ul>
              <li><strong>Adjacency List:</strong> Sparse graphs, most operations</li>
              <li><strong>Adjacency Matrix:</strong> Dense graphs, edge queries</li>
              <li><strong>DFS:</strong> Path finding, cycle detection</li>
              <li><strong>BFS:</strong> Shortest path, level-wise processing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>💡 Common Interview Problems</h2>
        <div className="grid-2">
          <div>
            <h3>Tree Problems</h3>
            <ul>
              <li>Maximum depth of binary tree</li>
              <li>Check if tree is balanced</li>
              <li>Lowest common ancestor</li>
              <li>Serialize/deserialize binary tree</li>
              <li>Validate binary search tree</li>
              <li>Tree to linked list conversion</li>
            </ul>
          </div>
          <div>
            <h3>Graph Problems</h3>
            <ul>
              <li>Number of connected components</li>
              <li>Detect cycle in graph</li>
              <li>Shortest path between nodes</li>
              <li>Clone a graph</li>
              <li>Course schedule (topological sort)</li>
              <li>Word ladder problem</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>🚀 Advanced Topics</h2>
        <div className="grid-3">
          <div>
            <h3>Tree Variants</h3>
            <ul>
              <li>AVL Trees (Self-balancing)</li>
              <li>Red-Black Trees</li>
              <li>B-Trees (Database indexing)</li>
              <li>Segment Trees</li>
              <li>Fenwick Trees</li>
            </ul>
          </div>
          <div>
            <h3>Graph Algorithms</h3>
            <ul>
              <li>Dijkstra's Algorithm</li>
              <li>Bellman-Ford Algorithm</li>
              <li>Floyd-Warshall Algorithm</li>
              <li>Kruskal's MST</li>
              <li>Prim's MST</li>
            </ul>
          </div>
          <div>
            <h3>Applications</h3>
            <ul>
              <li>Network routing</li>
              <li>Social networks</li>
              <li>Recommendation systems</li>
              <li>Game trees (AI)</li>
              <li>Compiler design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructures;
