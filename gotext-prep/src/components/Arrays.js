import React, { useState } from 'react';

const Arrays = () => {
  const [activeSection, setActiveSection] = useState(null);

  const arrayBasics = [
    {
      title: 'Array Declaration & Initialization',
      code: `// Declaration
int[] numbers;
String[] names;

// Initialization
int[] numbers = new int[5]; // Array of size 5
int[] values = {1, 2, 3, 4, 5}; // Array with values
int[] data = new int[]{10, 20, 30}; // Alternative syntax

// 2D Arrays
int[][] matrix = new int[3][4]; // 3x4 matrix
int[][] grid = {{1, 2}, {3, 4}, {5, 6}};`,
      useCase: 'Basic array operations, matrix problems, dynamic programming'
    },
    {
      title: 'Array Traversal',
      code: `int[] arr = {1, 2, 3, 4, 5};

// Traditional for loop
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// Enhanced for loop (for-each)
for (int num : arr) {
    System.out.println(num);
}

// Reverse traversal
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.println(arr[i]);
}`,
      useCase: 'Searching, sorting, data processing'
    }
  ];

  const commonAlgorithms = [
    {
      title: 'Linear Search',
      code: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}`,
      complexity: 'Time: O(n), Space: O(1)',
      useCase: 'Simple searching in unsorted arrays'
    },
    {
      title: 'Binary Search',
      code: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
      complexity: 'Time: O(log n), Space: O(1)',
      useCase: 'Efficient searching in sorted arrays'
    },
    {
      title: 'Bubble Sort',
      code: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
      complexity: 'Time: O(n²), Space: O(1)',
      useCase: 'Educational purposes, small datasets'
    },
    {
      title: 'Quick Sort',
      code: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}

private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`,
      complexity: 'Time: O(n log n) average, O(n²) worst, Space: O(log n)',
      useCase: 'General-purpose sorting, large datasets'
    }
  ];

  const arrayProblems = [
    {
      title: 'Find Maximum Element',
      code: `public static int findMax(int[] arr) {
    if (arr.length == 0) throw new IllegalArgumentException("Empty array");
    
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
      useCase: 'Data analysis, finding extremes'
    },
    {
      title: 'Two Sum Problem',
      code: `public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{}; // No solution found
}`,
      useCase: 'Array pair problems, target sum problems'
    },
    {
      title: 'Remove Duplicates (Sorted Array)',
      code: `public static int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    
    int i = 0;
    for (int j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1; // Length of array without duplicates
}`,
      useCase: 'Data cleaning, preprocessing'
    },
    {
      title: 'Rotate Array',
      code: `public static void rotate(int[] nums, int k) {
    k = k % nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}

private static void reverse(int[] nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}`,
      useCase: 'Array manipulation, circular operations'
    }
  ];

  const twoDArrays = [
    {
      title: 'Matrix Traversal',
      code: `// Row-wise traversal
public static void traverseRowWise(int[][] matrix) {
    for (int i = 0; i < matrix.length; i++) {
        for (int j = 0; j < matrix[i].length; j++) {
            System.out.print(matrix[i][j] + " ");
        }
        System.out.println();
    }
}

// Column-wise traversal
public static void traverseColumnWise(int[][] matrix) {
    for (int j = 0; j < matrix[0].length; j++) {
        for (int i = 0; i < matrix.length; i++) {
            System.out.print(matrix[i][j] + " ");
        }
        System.out.println();
    }
}`,
      useCase: 'Matrix operations, image processing'
    },
    {
      title: 'Matrix Transpose',
      code: `public static int[][] transpose(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    int[][] transposed = new int[cols][rows];
    
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }
    return transposed;
}`,
      useCase: 'Mathematical operations, data transformation'
    }
  ];

  return (
    <div className="fade-in">
      <div className="card">
        <h1>📊 Java Arrays - Complete Guide</h1>
        <p>Master array operations, algorithms, and common patterns used in coding interviews.</p>
      </div>

      <div className="card">
        <h2>🚀 Array Basics</h2>
        {arrayBasics.map((item, index) => (
          <div key={index} style={{marginBottom: '20px'}}>
            <h3>{item.title}</h3>
            <div className="code-block">
              <pre>{item.code}</pre>
            </div>
            <p><strong>Use Case:</strong> {item.useCase}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🔍 Search & Sort Algorithms</h2>
        {commonAlgorithms.map((algo, index) => (
          <div key={index} style={{marginBottom: '25px'}}>
            <h3>{algo.title}</h3>
            <div className="code-block">
              <pre>{algo.code}</pre>
            </div>
            <p><strong>Complexity:</strong> {algo.complexity}</p>
            <p><strong>Use Case:</strong> {algo.useCase}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>💡 Common Array Problems</h2>
        {arrayProblems.map((problem, index) => (
          <div key={index} style={{marginBottom: '25px'}}>
            <h3>{problem.title}</h3>
            <div className="code-block">
              <pre>{problem.code}</pre>
            </div>
            <p><strong>Use Case:</strong> {problem.useCase}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🎯 2D Arrays (Matrices)</h2>
        {twoDArrays.map((item, index) => (
          <div key={index} style={{marginBottom: '25px'}}>
            <h3>{item.title}</h3>
            <div className="code-block">
              <pre>{item.code}</pre>
            </div>
            <p><strong>Use Case:</strong> {item.useCase}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>⚡ Array Performance Tips</h2>
        <div className="grid-2">
          <div>
            <h3>Memory Considerations</h3>
            <ul className="feature-list">
              <li>Arrays are stored in contiguous memory</li>
              <li>Random access is O(1)</li>
              <li>Size is fixed after creation</li>
              <li>Use ArrayList for dynamic sizing</li>
            </ul>
          </div>
          <div>
            <h3>Common Pitfalls</h3>
            <ul className="tip-list">
              <li>ArrayIndexOutOfBoundsException</li>
              <li>Null pointer exceptions</li>
              <li>Off-by-one errors in loops</li>
              <li>Modifying array while iterating</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>🎪 Advanced Array Techniques</h2>
        <div className="code-block">
          <pre>{`// Sliding Window Technique
public static int maxSum(int[] arr, int k) {
    int maxSum = 0, windowSum = 0;
    
    // Calculate sum of first window
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}

// Two Pointers Technique
public static boolean isPalindrome(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        if (arr[left] != arr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`}</pre>
        </div>
      </div>
    </div>
  );
};

export default Arrays;
