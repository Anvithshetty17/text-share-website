import React, { useState } from 'react';

const Algorithms = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState(null);

  const algorithms = [
    {
      title: 'Dynamic Programming',
      description: 'Solve complex problems by breaking them down into simpler subproblems',
      types: [
        {
          name: 'Fibonacci Sequence',
          code: `// Recursive (Inefficient)
public static int fibRecursive(int n) {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// Dynamic Programming (Memoization)
public static int fibMemo(int n) {
    int[] memo = new int[n + 1];
    return fibMemoHelper(n, memo);
}

private static int fibMemoHelper(int n, int[] memo) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    
    memo[n] = fibMemoHelper(n - 1, memo) + fibMemoHelper(n - 2, memo);
    return memo[n];
}

// Dynamic Programming (Tabulation)
public static int fibTab(int n) {
    if (n <= 1) return n;
    
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space Optimized
public static int fibOptimized(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`
        },
        {
          name: 'Longest Common Subsequence (LCS)',
          code: `public static int lcs(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Space Optimized Version
public static int lcsOptimized(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[] prev = new int[n + 1];
    int[] curr = new int[n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        prev = curr.clone();
    }
    
    return curr[n];
}`
        },
        {
          name: '0/1 Knapsack Problem',
          code: `public static int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]], // Include item
                    dp[i - 1][w] // Exclude item
                );
            } else {
                dp[i][w] = dp[i - 1][w]; // Can't include item
            }
        }
    }
    
    return dp[n][capacity];
}

// Space Optimized Version
public static int knapsackOptimized(int[] weights, int[] values, int capacity) {
    int[] dp = new int[capacity + 1];
    
    for (int i = 0; i < weights.length; i++) {
        for (int w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}`
        }
      ]
    },
    {
      title: 'Backtracking',
      description: 'Explore all possible solutions by trying partial solutions and abandoning them if they cannot lead to a complete solution',
      types: [
        {
          name: 'N-Queens Problem',
          code: `public static List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    char[][] board = new char[n][n];
    
    // Initialize board
    for (int i = 0; i < n; i++) {
        Arrays.fill(board[i], '.');
    }
    
    backtrack(board, 0, result);
    return result;
}

private static void backtrack(char[][] board, int row, List<List<String>> result) {
    if (row == board.length) {
        result.add(constructBoard(board));
        return;
    }
    
    for (int col = 0; col < board.length; col++) {
        if (isValid(board, row, col)) {
            board[row][col] = 'Q';
            backtrack(board, row + 1, result);
            board[row][col] = '.'; // Backtrack
        }
    }
}

private static boolean isValid(char[][] board, int row, int col) {
    int n = board.length;
    
    // Check column
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') return false;
    }
    
    // Check diagonal (top-left to bottom-right)
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') return false;
    }
    
    // Check diagonal (top-right to bottom-left)
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') return false;
    }
    
    return true;
}

private static List<String> constructBoard(char[][] board) {
    List<String> result = new ArrayList<>();
    for (char[] row : board) {
        result.add(new String(row));
    }
    return result;
}`
        },
        {
          name: 'Generate Parentheses',
          code: `public static List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, "", 0, 0, n);
    return result;
}

private static void backtrack(List<String> result, String current, int open, int close, int max) {
    if (current.length() == max * 2) {
        result.add(current);
        return;
    }
    
    if (open < max) {
        backtrack(result, current + "(", open + 1, close, max);
    }
    
    if (close < open) {
        backtrack(result, current + ")", open, close + 1, max);
    }
}`
        },
        {
          name: 'Sudoku Solver',
          code: `public static boolean solveSudoku(char[][] board) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == '.') {
                for (char c = '1'; c <= '9'; c++) {
                    if (isValidSudoku(board, i, j, c)) {
                        board[i][j] = c;
                        
                        if (solveSudoku(board)) {
                            return true;
                        }
                        
                        board[i][j] = '.'; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

private static boolean isValidSudoku(char[][] board, int row, int col, char c) {
    for (int i = 0; i < 9; i++) {
        // Check row
        if (board[row][i] == c) return false;
        
        // Check column
        if (board[i][col] == c) return false;
        
        // Check 3x3 box
        int boxRow = 3 * (row / 3) + i / 3;
        int boxCol = 3 * (col / 3) + i % 3;
        if (board[boxRow][boxCol] == c) return false;
    }
    return true;
}`
        }
      ]
    },
    {
      title: 'Greedy Algorithms',
      description: 'Make locally optimal choices at each step, hoping to find a global optimum',
      types: [
        {
          name: 'Activity Selection Problem',
          code: `public static int activitySelection(int[] start, int[] finish) {
    int n = start.length;
    
    // Create array of activities with start and finish times
    int[][] activities = new int[n][2];
    for (int i = 0; i < n; i++) {
        activities[i][0] = start[i];
        activities[i][1] = finish[i];
    }
    
    // Sort by finish time
    Arrays.sort(activities, (a, b) -> Integer.compare(a[1], b[1]));
    
    int count = 1; // First activity is always selected
    int lastFinishTime = activities[0][1];
    
    for (int i = 1; i < n; i++) {
        if (activities[i][0] >= lastFinishTime) {
            count++;
            lastFinishTime = activities[i][1];
        }
    }
    
    return count;
}`
        },
        {
          name: 'Fractional Knapsack',
          code: `static class Item {
    int value, weight;
    double ratio;
    
    Item(int value, int weight) {
        this.value = value;
        this.weight = weight;
        this.ratio = (double) value / weight;
    }
}

public static double fractionalKnapsack(int[] values, int[] weights, int capacity) {
    int n = values.length;
    Item[] items = new Item[n];
    
    for (int i = 0; i < n; i++) {
        items[i] = new Item(values[i], weights[i]);
    }
    
    // Sort by value/weight ratio in descending order
    Arrays.sort(items, (a, b) -> Double.compare(b.ratio, a.ratio));
    
    double totalValue = 0;
    int currentWeight = 0;
    
    for (Item item : items) {
        if (currentWeight + item.weight <= capacity) {
            // Take the whole item
            currentWeight += item.weight;
            totalValue += item.value;
        } else {
            // Take fraction of the item
            int remainingCapacity = capacity - currentWeight;
            totalValue += item.value * ((double) remainingCapacity / item.weight);
            break;
        }
    }
    
    return totalValue;
}`
        }
      ]
    },
    {
      title: 'Binary Search Variations',
      description: 'Efficient searching technique with O(log n) complexity',
      types: [
        {
          name: 'Search in Rotated Sorted Array',
          code: `public static int searchRotated(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}`
        },
        {
          name: 'Find Peak Element',
          code: `public static int findPeakElement(int[] nums) {
    int left = 0, right = nums.length - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] > nums[mid + 1]) {
            // Peak is on the left side (including mid)
            right = mid;
        } else {
            // Peak is on the right side
            left = mid + 1;
        }
    }
    
    return left;
}`
        },
        {
          name: 'Square Root',
          code: `public static int mySqrt(int x) {
    if (x == 0) return 0;
    
    int left = 1, right = x;
    int result = 0;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (mid <= x / mid) { // Avoid overflow
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}`
        }
      ]
    }
  ];

  return (
    <div className="fade-in">
      <div className="card">
        <h1>⚡ Essential Algorithms for Coding Interviews</h1>
        <p>Master the most important algorithmic techniques that frequently appear in coding interviews.</p>
      </div>

      {algorithms.map((algorithm, index) => (
        <div key={index} className="card">
          <h2>{algorithm.title}</h2>
          <p>{algorithm.description}</p>
          
          {algorithm.types.map((type, typeIndex) => (
            <div key={typeIndex} style={{marginBottom: '25px'}}>
              <h3>{type.name}</h3>
              <div className="code-block">
                <pre>{type.code}</pre>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="card">
        <h2>🎯 Algorithm Selection Guide</h2>
        <div className="grid-2">
          <div>
            <h3>Dynamic Programming</h3>
            <ul>
              <li>Overlapping subproblems</li>
              <li>Optimal substructure</li>
              <li>Optimization problems</li>
              <li>Examples: Fibonacci, LCS, Knapsack</li>
            </ul>
          </div>
          <div>
            <h3>Greedy Algorithms</h3>
            <ul>
              <li>Locally optimal choices</li>
              <li>No backtracking needed</li>
              <li>Activity selection, scheduling</li>
              <li>Examples: Fractional knapsack, MST</li>
            </ul>
          </div>
          <div>
            <h3>Backtracking</h3>
            <ul>
              <li>Explore all possibilities</li>
              <li>Constraint satisfaction</li>
              <li>Generate combinations/permutations</li>
              <li>Examples: N-Queens, Sudoku</li>
            </ul>
          </div>
          <div>
            <h3>Binary Search</h3>
            <ul>
              <li>Sorted data structures</li>
              <li>Search space reduction</li>
              <li>O(log n) complexity</li>
              <li>Examples: Search, peak finding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algorithms;
