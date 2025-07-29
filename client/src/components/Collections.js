import React, { useState } from 'react';

const Collections = () => {
  const [activeCollection, setActiveCollection] = useState(null);

  const collectionsOverview = {
    title: 'Java Collections Framework Hierarchy',
    code: `Collection (Interface)
├── List (Interface)
│   ├── ArrayList (Class)
│   ├── LinkedList (Class)
│   └── Vector (Class)
├── Set (Interface)
│   ├── HashSet (Class)
│   ├── LinkedHashSet (Class)
│   └── TreeSet (Class)
└── Queue (Interface)
    ├── PriorityQueue (Class)
    ├── ArrayDeque (Class)
    └── LinkedList (Class)

Map (Interface)
├── HashMap (Class)
├── LinkedHashMap (Class)
├── TreeMap (Class)
└── Hashtable (Class)`
  };

  const collections = [
    {
      name: 'ArrayList',
      type: 'List Implementation',
      description: 'Resizable array implementation of List interface',
      features: [
        'Dynamic array that can grow/shrink',
        'Allows duplicate elements',
        'Maintains insertion order',
        'Random access with index',
        'Not synchronized (not thread-safe)'
      ],
      timeComplexity: {
        'Access': 'O(1)',
        'Search': 'O(n)',
        'Insertion': 'O(1) amortized, O(n) worst case',
        'Deletion': 'O(n)'
      },
      code: `import java.util.*;

// Declaration and Initialization
ArrayList<String> list = new ArrayList<>();
ArrayList<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

// Common Operations
list.add("Java");           // Add element
list.add(0, "Python");      // Add at specific index
list.get(0);                // Get element at index
list.set(1, "C++");         // Update element
list.remove(0);             // Remove by index
list.remove("Java");        // Remove by object
list.size();                // Get size
list.isEmpty();             // Check if empty
list.contains("Java");      // Check if contains element
list.clear();               // Remove all elements

// Iteration
for (String lang : list) {
    System.out.println(lang);
}

// Convert to Array
String[] array = list.toArray(new String[0]);`,
      useCases: [
        'When you need fast random access to elements',
        'When you frequently access elements by index',
        'When you need to store and retrieve data in order',
        'For implementing dynamic arrays'
      ]
    },
    {
      name: 'LinkedList',
      type: 'List & Deque Implementation',
      description: 'Doubly-linked list implementation',
      features: [
        'Doubly-linked list structure',
        'Implements both List and Deque interfaces',
        'Efficient insertion/deletion at beginning and end',
        'No random access (sequential access only)',
        'Not synchronized'
      ],
      timeComplexity: {
        'Access': 'O(n)',
        'Search': 'O(n)',
        'Insertion': 'O(1) at ends, O(n) at middle',
        'Deletion': 'O(1) at ends, O(n) at middle'
      },
      code: `import java.util.*;

// Declaration
LinkedList<String> list = new LinkedList<>();

// List Operations
list.add("First");
list.add("Second");
list.addFirst("Start");     // Add at beginning
list.addLast("End");        // Add at end
list.getFirst();            // Get first element
list.getLast();             // Get last element
list.removeFirst();         // Remove first
list.removeLast();          // Remove last

// Deque Operations (Double-ended queue)
list.push("Top");           // Add to front (stack operation)
list.pop();                 // Remove from front
list.offer("Rear");         // Add to rear (queue operation)
list.poll();                // Remove from front

// Use as Stack
LinkedList<Integer> stack = new LinkedList<>();
stack.push(1);
stack.push(2);
int top = stack.pop();      // Returns 2

// Use as Queue
LinkedList<String> queue = new LinkedList<>();
queue.offer("First");
queue.offer("Second");
String first = queue.poll(); // Returns "First"`,
      useCases: [
        'When you need frequent insertion/deletion at ends',
        'Implementing stacks and queues',
        'When you don\'t need random access',
        'For undo operations in applications'
      ]
    },
    {
      name: 'HashSet',
      type: 'Set Implementation',
      description: 'Hash table based Set implementation',
      features: [
        'No duplicate elements allowed',
        'No guaranteed order of elements',
        'Allows one null element',
        'Fast operations (O(1) average)',
        'Not synchronized'
      ],
      timeComplexity: {
        'Add': 'O(1) average, O(n) worst case',
        'Remove': 'O(1) average, O(n) worst case',
        'Contains': 'O(1) average, O(n) worst case',
        'Size': 'O(1)'
      },
      code: `import java.util.*;

// Declaration
HashSet<String> set = new HashSet<>();
HashSet<Integer> numbers = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));

// Common Operations
set.add("Java");            // Add element
set.add("Python");
set.add("Java");            // Duplicate - won't be added
set.remove("Python");       // Remove element
set.contains("Java");       // Check if exists
set.size();                 // Get size
set.isEmpty();              // Check if empty
set.clear();                // Remove all

// Set Operations
HashSet<String> set1 = new HashSet<>(Arrays.asList("A", "B", "C"));
HashSet<String> set2 = new HashSet<>(Arrays.asList("B", "C", "D"));

// Union
HashSet<String> union = new HashSet<>(set1);
union.addAll(set2);         // {A, B, C, D}

// Intersection
HashSet<String> intersection = new HashSet<>(set1);
intersection.retainAll(set2); // {B, C}

// Difference
HashSet<String> difference = new HashSet<>(set1);
difference.removeAll(set2);   // {A}

// Iteration
for (String element : set) {
    System.out.println(element);
}`,
      useCases: [
        'Removing duplicates from data',
        'Fast membership testing',
        'Set operations (union, intersection)',
        'When order doesn\'t matter'
      ]
    },
    {
      name: 'HashMap',
      type: 'Map Implementation',
      description: 'Hash table based Map implementation',
      features: [
        'Key-value pairs storage',
        'No duplicate keys allowed',
        'Allows one null key and multiple null values',
        'No guaranteed order',
        'Not synchronized'
      ],
      timeComplexity: {
        'Get': 'O(1) average, O(n) worst case',
        'Put': 'O(1) average, O(n) worst case',
        'Remove': 'O(1) average, O(n) worst case',
        'ContainsKey': 'O(1) average, O(n) worst case'
      },
      code: `import java.util.*;

// Declaration
HashMap<String, Integer> map = new HashMap<>();
HashMap<String, String> capitals = new HashMap<String, String>() {{
    put("India", "New Delhi");
    put("USA", "Washington DC");
    put("Japan", "Tokyo");
}};

// Common Operations
map.put("Java", 25);        // Add key-value pair
map.put("Python", 30);
map.put("Java", 28);        // Updates existing key
map.get("Java");            // Get value for key
map.getOrDefault("C++", 0); // Get with default value
map.remove("Python");       // Remove by key
map.containsKey("Java");    // Check if key exists
map.containsValue(25);      // Check if value exists
map.size();                 // Get size
map.isEmpty();              // Check if empty

// Iteration methods
// 1. Iterate over keys
for (String key : map.keySet()) {
    System.out.println(key + " = " + map.get(key));
}

// 2. Iterate over values
for (Integer value : map.values()) {
    System.out.println(value);
}

// 3. Iterate over entries
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}

// 4. Using forEach (Java 8+)
map.forEach((key, value) -> 
    System.out.println(key + " = " + value)
);`,
      useCases: [
        'Caching and memoization',
        'Counting frequency of elements',
        'Database-like key-value storage',
        'Configuration settings storage'
      ]
    },
    {
      name: 'TreeSet',
      type: 'Sorted Set Implementation',
      description: 'Red-Black tree based NavigableSet implementation',
      features: [
        'Sorted set implementation',
        'No duplicate elements',
        'NavigableSet operations',
        'No null elements allowed',
        'Log(n) time for basic operations'
      ],
      timeComplexity: {
        'Add': 'O(log n)',
        'Remove': 'O(log n)',
        'Contains': 'O(log n)',
        'First/Last': 'O(log n)'
      },
      code: `import java.util.*;

// Declaration
TreeSet<Integer> treeSet = new TreeSet<>();
TreeSet<String> sortedStrings = new TreeSet<>(Arrays.asList("banana", "apple", "cherry"));

// Common Operations
treeSet.add(50);
treeSet.add(30);
treeSet.add(70);
treeSet.add(20);
// TreeSet: [20, 30, 50, 70] - automatically sorted

// NavigableSet Operations
treeSet.first();            // Returns 20 (smallest)
treeSet.last();             // Returns 70 (largest)
treeSet.lower(50);          // Returns 30 (largest < 50)
treeSet.higher(50);         // Returns 70 (smallest > 50)
treeSet.floor(45);          // Returns 30 (largest <= 45)
treeSet.ceiling(45);        // Returns 50 (smallest >= 45)

// Subset operations
TreeSet<Integer> subset = new TreeSet<>(treeSet.subSet(25, 60)); // [30, 50]
TreeSet<Integer> headSet = new TreeSet<>(treeSet.headSet(50));   // [20, 30]
TreeSet<Integer> tailSet = new TreeSet<>(treeSet.tailSet(50));   // [50, 70]

// Custom Comparator
TreeSet<String> customSet = new TreeSet<>((a, b) -> b.compareTo(a)); // Reverse order
customSet.addAll(Arrays.asList("apple", "banana", "cherry"));
// Result: [cherry, banana, apple]`,
      useCases: [
        'When you need sorted unique elements',
        'Range queries on sorted data',
        'Finding elements near a given value',
        'Implementing sorted collections'
      ]
    },
    {
      name: 'PriorityQueue',
      type: 'Queue Implementation',
      description: 'Heap-based priority queue implementation',
      features: [
        'Elements are ordered by priority',
        'Min-heap by default (smallest element first)',
        'Not synchronized',
        'No null elements allowed',
        'Unbounded queue'
      ],
      timeComplexity: {
        'Offer/Add': 'O(log n)',
        'Poll/Remove': 'O(log n)',
        'Peek': 'O(1)',
        'Size': 'O(1)'
      },
      code: `import java.util.*;

// Declaration - Min Heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Max Heap using custom comparator
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

// Common Operations
minHeap.offer(30);          // Add element
minHeap.offer(10);
minHeap.offer(50);
minHeap.offer(20);
// MinHeap order: 10 will be at top

int smallest = minHeap.peek();  // Returns 10 (doesn't remove)
int removed = minHeap.poll();   // Returns and removes 10

// Custom objects with Comparator
class Task {
    String name;
    int priority;
    
    Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }
}

PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    (t1, t2) -> Integer.compare(t1.priority, t2.priority)
);

taskQueue.offer(new Task("Low Priority", 3));
taskQueue.offer(new Task("High Priority", 1));
taskQueue.offer(new Task("Medium Priority", 2));

// Poll will return High Priority task first

// Common use case: Find K largest elements
public static List<Integer> findKLargest(int[] arr, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    
    for (int num : arr) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }
    
    return new ArrayList<>(minHeap);
}`,
      useCases: [
        'Task scheduling with priorities',
        'Finding K largest/smallest elements',
        'Implementing Dijkstra\'s algorithm',
        'Merge K sorted arrays'
      ]
    },
    {
      name: 'Stack',
      type: 'LIFO Data Structure',
      description: 'Legacy Stack class (use Deque instead)',
      features: [
        'Last In, First Out (LIFO) ordering',
        'Extends Vector class',
        'Synchronized (thread-safe)',
        'Legacy class - use ArrayDeque instead'
      ],
      timeComplexity: {
        'Push': 'O(1)',
        'Pop': 'O(1)',
        'Peek': 'O(1)',
        'Search': 'O(n)'
      },
      code: `import java.util.*;

// Legacy Stack (not recommended)
Stack<String> stack = new Stack<>();
stack.push("First");
stack.push("Second");
stack.push("Third");
String top = stack.pop();   // Returns "Third"
String peek = stack.peek(); // Returns "Second" (doesn't remove)

// Recommended: Use ArrayDeque as Stack
Deque<String> stack2 = new ArrayDeque<>();
stack2.push("First");
stack2.push("Second");
stack2.push("Third");
String top2 = stack2.pop();     // Returns "Third"
String peek2 = stack2.peek();   // Returns "Second"

// Stack applications
// 1. Balanced Parentheses Check
public static boolean isBalanced(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[' || c == '{') {
            stack.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                return false;
            }
        }
    }
    return stack.isEmpty();
}

// 2. Reverse a string
public static String reverse(String str) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : str.toCharArray()) {
        stack.push(c);
    }
    
    StringBuilder result = new StringBuilder();
    while (!stack.isEmpty()) {
        result.append(stack.pop());
    }
    return result.toString();
}`,
      useCases: [
        'Function call management',
        'Expression evaluation',
        'Undo operations',
        'Backtracking algorithms'
      ]
    }
  ];

  const comparisonTable = [
    { collection: 'ArrayList', access: 'O(1)', search: 'O(n)', insert: 'O(1)*', delete: 'O(n)', ordered: 'Yes', duplicates: 'Yes', null: 'Yes' },
    { collection: 'LinkedList', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', ordered: 'Yes', duplicates: 'Yes', null: 'Yes' },
    { collection: 'HashSet', access: 'N/A', search: 'O(1)*', insert: 'O(1)*', delete: 'O(1)*', ordered: 'No', duplicates: 'No', null: 'One' },
    { collection: 'TreeSet', access: 'N/A', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', ordered: 'Yes', duplicates: 'No', null: 'No' },
    { collection: 'HashMap', access: 'O(1)*', search: 'O(1)*', insert: 'O(1)*', delete: 'O(1)*', ordered: 'No', duplicates: 'No', null: 'Key:One, Val:Yes' },
    { collection: 'TreeMap', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', ordered: 'Yes', duplicates: 'No', null: 'Val:Yes' }
  ];

  return (
    <div className="fade-in">
      <div className="card">
        <h1>📋 Java Collections Framework</h1>
        <p>Complete guide to Java Collections with examples, use cases, and performance analysis.</p>
      </div>

      <div className="card">
        <h2>🏗️ Collections Hierarchy</h2>
        <div className="code-block">
          <pre>{collectionsOverview.code}</pre>
        </div>
      </div>

      <div className="card">
        <h2>📊 Performance Comparison</h2>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
            <thead>
              <tr style={{backgroundColor: '#f8f9fa'}}>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Collection</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Access</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Search</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Insert</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Delete</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Ordered</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Duplicates</th>
                <th style={{padding: '12px', border: '1px solid #ddd'}}>Null Values</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, index) => (
                <tr key={index}>
                  <td style={{padding: '12px', border: '1px solid #ddd', fontWeight: 'bold'}}>{row.collection}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.access}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.search}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.insert}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.delete}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.ordered}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.duplicates}</td>
                  <td style={{padding: '12px', border: '1px solid #ddd'}}>{row.null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
          * Average case complexity. Worst case may be O(n) for hash-based collections.
        </p>
      </div>

      {collections.map((collection, index) => (
        <div key={index} className="card">
          <h2>{collection.name} - {collection.type}</h2>
          <p>{collection.description}</p>
          
          <h3>Key Features:</h3>
          <ul>
            {collection.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          <h3>Time Complexity:</h3>
          <div className="grid-2">
            {Object.entries(collection.timeComplexity).map(([operation, complexity]) => (
              <div key={operation} style={{padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', margin: '5px'}}>
                <strong>{operation}:</strong> {complexity}
              </div>
            ))}
          </div>

          <button 
            className="btn"
            onClick={() => setActiveCollection(activeCollection === index ? null : index)}
          >
            {activeCollection === index ? 'Hide Code Examples' : 'Show Code Examples'}
          </button>

          {activeCollection === index && (
            <div style={{marginTop: '20px'}}>
              <h3>Code Examples:</h3>
              <div className="code-block">
                <pre>{collection.code}</pre>
              </div>
              
              <h3>Common Use Cases:</h3>
              <ul>
                {collection.useCases.map((useCase, idx) => (
                  <li key={idx}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <div className="card">
        <h2>🎯 Collection Selection Guide</h2>
        <div className="grid-2">
          <div>
            <h3>When to use ArrayList:</h3>
            <ul>
              <li>Need fast random access by index</li>
              <li>More reads than writes</li>
              <li>Memory is a concern (most compact)</li>
            </ul>
          </div>
          <div>
            <h3>When to use LinkedList:</h3>
            <ul>
              <li>Frequent insertions/deletions at ends</li>
              <li>Implementing stacks/queues</li>
              <li>Don't need random access</li>
            </ul>
          </div>
          <div>
            <h3>When to use HashSet:</h3>
            <ul>
              <li>Need unique elements only</li>
              <li>Fast lookups are important</li>
              <li>Order doesn't matter</li>
            </ul>
          </div>
          <div>
            <h3>When to use TreeSet:</h3>
            <ul>
              <li>Need sorted unique elements</li>
              <li>Need range operations</li>
              <li>Can sacrifice some performance for ordering</li>
            </ul>
          </div>
          <div>
            <h3>When to use HashMap:</h3>
            <ul>
              <li>Key-value associations</li>
              <li>Fast lookups by key</li>
              <li>Caching/memoization</li>
            </ul>
          </div>
          <div>
            <h3>When to use PriorityQueue:</h3>
            <ul>
              <li>Need to process elements by priority</li>
              <li>Finding min/max efficiently</li>
              <li>Implementing heap-based algorithms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
