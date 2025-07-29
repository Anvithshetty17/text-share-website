import React, { useState } from 'react';

const PracticeQuestions = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showHints, setShowHints] = useState({});
  const [showSolutions, setShowSolutions] = useState({});

  const questions = [
    {
      id: 1,
      title: "Reverse a String",
      difficulty: "easy",
      category: "String",
      problem: "Write a function to reverse a string without using built-in reverse methods.",
      company: "Amazon, Microsoft",
      hints: [
        "Think about using two pointers approach",
        "Convert string to character array for easier manipulation",
        "Swap characters from both ends moving towards center"
      ],
      solution: `public static String reverseString(String str) {
    char[] chars = str.toCharArray();
    int left = 0, right = chars.length - 1;
    
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
    
    return new String(chars);
}

// Alternative using StringBuilder
public static String reverseStringBuilder(String str) {
    StringBuilder sb = new StringBuilder(str);
    return sb.reverse().toString();
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    {
      id: 16,
      title: "Valid Anagram",
      difficulty: "easy",
      category: "String",
      problem: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      company: "Facebook, Google",
      hints: [
        "Count frequency of each character",
        "Two strings are anagrams if they have same character frequencies",
        "Can also sort both strings and compare"
      ],
      solution: `public static boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    
    int[] count = new int[26]; // For lowercase letters
    
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    
    for (int c : count) {
        if (c != 0) return false;
    }
    
    return true;
}

// Alternative using HashMap
public static boolean isAnagramMap(String s, String t) {
    if (s.length() != t.length()) return false;
    
    Map<Character, Integer> map = new HashMap<>();
    
    for (char c : s.toCharArray()) {
        map.put(c, map.getOrDefault(c, 0) + 1);
    }
    
    for (char c : t.toCharArray()) {
        map.put(c, map.getOrDefault(c, 0) - 1);
        if (map.get(c) < 0) return false;
    }
    
    return true;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) for array approach, O(k) for map where k is unique characters"
    },
    {
      id: 17,
      title: "Group Anagrams",
      difficulty: "medium",
      category: "String",
      problem: "Given an array of strings, group the anagrams together.",
      company: "Amazon, Facebook, Uber",
      hints: [
        "Use sorted string as key in HashMap",
        "All anagrams will have same sorted string",
        "Group strings with same key together"
      ],
      solution: `public static List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    
    for (String str : strs) {
        char[] chars = str.toCharArray();
        Arrays.sort(chars);
        String key = String.valueOf(chars);
        
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
    }
    
    return new ArrayList<>(map.values());
}

// Alternative using character count as key
public static List<List<String>> groupAnagramsCount(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    
    for (String str : strs) {
        int[] count = new int[26];
        for (char c : str.toCharArray()) {
            count[c - 'a']++;
        }
        
        String key = Arrays.toString(count);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
    }
    
    return new ArrayList<>(map.values());
}`,
      timeComplexity: "O(n * k log k) where n is number of strings, k is max length",
      spaceComplexity: "O(n * k)"
    },
    {
      id: 18,
      title: "Palindrome Number",
      difficulty: "easy",
      category: "Math",
      problem: "Determine whether an integer is a palindrome without converting to string.",
      company: "Microsoft, Apple",
      hints: [
        "Reverse half of the number",
        "Compare first half with reversed second half",
        "Handle negative numbers and numbers ending with 0"
      ],
      solution: `public static boolean isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    
    int reversedHalf = 0;
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + x % 10;
        x /= 10;
    }
    
    // For odd length numbers, we need to remove middle digit
    return x == reversedHalf || x == reversedHalf / 10;
}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 19,
      title: "Roman to Integer",
      difficulty: "easy",
      category: "String",
      problem: "Convert a roman numeral to an integer.",
      company: "Facebook, Microsoft",
      hints: [
        "Create mapping of roman characters to integers",
        "If current character value < next character value, subtract current",
        "Otherwise add current character value"
      ],
      solution: `public static int romanToInt(String s) {
    Map<Character, Integer> map = new HashMap<>();
    map.put('I', 1);
    map.put('V', 5);
    map.put('X', 10);
    map.put('L', 50);
    map.put('C', 100);
    map.put('D', 500);
    map.put('M', 1000);
    
    int result = 0;
    for (int i = 0; i < s.length(); i++) {
        int current = map.get(s.charAt(i));
        
        if (i + 1 < s.length() && current < map.get(s.charAt(i + 1))) {
            result -= current;
        } else {
            result += current;
        }
    }
    
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 20,
      title: "Longest Common Prefix",
      difficulty: "easy",
      category: "String",
      problem: "Find the longest common prefix string amongst an array of strings.",
      company: "Google, Amazon",
      hints: [
        "Compare characters at same position across all strings",
        "Stop when mismatch found or reach end of any string",
        "Can also use divide and conquer approach"
      ],
      solution: `public static String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) return "";
    
    String prefix = strs[0];
    
    for (int i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.substring(0, prefix.length() - 1);
            if (prefix.isEmpty()) return "";
        }
    }
    
    return prefix;
}

// Alternative vertical scanning approach
public static String longestCommonPrefixVertical(String[] strs) {
    if (strs == null || strs.length == 0) return "";
    
    for (int i = 0; i < strs[0].length(); i++) {
        char c = strs[0].charAt(i);
        for (int j = 1; j < strs.length; j++) {
            if (i >= strs[j].length() || strs[j].charAt(i) != c) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0];
}`,
      timeComplexity: "O(S) where S is sum of all characters",
      spaceComplexity: "O(1)"
    },
    {
      id: 21,
      title: "Remove Duplicates from Sorted Array",
      difficulty: "easy",
      category: "Array",
      problem: "Remove duplicates in-place from sorted array and return new length.",
      company: "Microsoft, Facebook",
      hints: [
        "Use two pointers approach",
        "One pointer for reading, one for writing",
        "Only write when element is different from previous"
      ],
      solution: `public static int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    
    int writeIndex = 1;
    
    for (int readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] != nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 22,
      title: "Best Time to Buy and Sell Stock",
      difficulty: "easy",
      category: "Array",
      problem: "Find maximum profit from buying and selling stock once.",
      company: "Amazon, Google, Facebook",
      hints: [
        "Track minimum price seen so far",
        "For each price, calculate potential profit",
        "Keep track of maximum profit"
      ],
      solution: `public static int maxProfit(int[] prices) {
    if (prices.length < 2) return 0;
    
    int minPrice = prices[0];
    int maxProfit = 0;
    
    for (int i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    
    return maxProfit;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 23,
      title: "Missing Number",
      difficulty: "easy",
      category: "Array",
      problem: "Find the missing number in an array containing n distinct numbers from 0 to n.",
      company: "Microsoft, Bloomberg",
      hints: [
        "Use mathematical sum formula",
        "Calculate expected sum and subtract actual sum",
        "Alternative: use XOR properties"
      ],
      solution: `public static int missingNumber(int[] nums) {
    int n = nums.length;
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    
    for (int num : nums) {
        actualSum += num;
    }
    
    return expectedSum - actualSum;
}

// Alternative using XOR
public static int missingNumberXOR(int[] nums) {
    int xor = nums.length;
    
    for (int i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    
    return xor;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 24,
      title: "Move Zeroes",
      difficulty: "easy",
      category: "Array",
      problem: "Move all zeros in array to the end while maintaining relative order of non-zero elements.",
      company: "Facebook, Google",
      hints: [
        "Use two pointers approach",
        "One pointer for non-zero elements position",
        "Swap when non-zero element found"
      ],
      solution: `public static void moveZeroes(int[] nums) {
    int nonZeroIndex = 0;
    
    // Move all non-zero elements to front
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[nonZeroIndex] = nums[i];
            nonZeroIndex++;
        }
    }
    
    // Fill remaining positions with zeros
    while (nonZeroIndex < nums.length) {
        nums[nonZeroIndex] = 0;
        nonZeroIndex++;
    }
}

// Alternative with swapping
public static void moveZeroesSwap(int[] nums) {
    int left = 0;
    
    for (int right = 0; right < nums.length; right++) {
        if (nums[right] != 0) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
        }
    }
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 25,
      title: "Intersection of Two Arrays",
      difficulty: "easy",
      category: "Array",
      problem: "Find intersection of two arrays. Each element should appear only once.",
      company: "Google, Facebook",
      hints: [
        "Use HashSet to store elements of first array",
        "Iterate through second array and check if element exists in set",
        "Add to result if found and not already added"
      ],
      solution: `public static int[] intersection(int[] nums1, int[] nums2) {
    Set<Integer> set1 = new HashSet<>();
    Set<Integer> result = new HashSet<>();
    
    for (int num : nums1) {
        set1.add(num);
    }
    
    for (int num : nums2) {
        if (set1.contains(num)) {
            result.add(num);
        }
    }
    
    return result.stream().mapToInt(Integer::intValue).toArray();
}

// Alternative using two sets
public static int[] intersectionTwoSets(int[] nums1, int[] nums2) {
    Set<Integer> set1 = new HashSet<>();
    Set<Integer> intersection = new HashSet<>();
    
    for (int num : nums1) {
        set1.add(num);
    }
    
    for (int num : nums2) {
        if (set1.contains(num)) {
            intersection.add(num);
        }
    }
    
    int[] result = new int[intersection.size()];
    int i = 0;
    for (int num : intersection) {
        result[i++] = num;
    }
    
    return result;
}`,
      timeComplexity: "O(m + n)",
      spaceComplexity: "O(min(m, n))"
    },
    {
      id: 26,
      title: "Single Number",
      difficulty: "easy",
      category: "Bit Manipulation",
      problem: "Find the single number in array where every element appears twice except one.",
      company: "Google, Amazon",
      hints: [
        "Use XOR properties: a ^ a = 0, a ^ 0 = a",
        "XOR all numbers together",
        "Duplicates will cancel out, leaving only single number"
      ],
      solution: `public static int singleNumber(int[] nums) {
    int result = 0;
    
    for (int num : nums) {
        result ^= num;
    }
    
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 27,
      title: "Happy Number",
      difficulty: "easy",
      category: "Math",
      problem: "Determine if a number is happy (reaches 1 when replaced by sum of squares of digits repeatedly).",
      company: "Uber, Airbnb",
      hints: [
        "Use HashSet to detect cycles",
        "Calculate sum of squares of digits",
        "If we see same number again, it's a cycle (not happy)"
      ],
      solution: `public static boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();
    
    while (n != 1 && !seen.contains(n)) {
        seen.add(n);
        n = getSumOfSquares(n);
    }
    
    return n == 1;
}

private static int getSumOfSquares(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}

// Alternative using Floyd's cycle detection
public static boolean isHappyFloyd(int n) {
    int slow = n;
    int fast = n;
    
    do {
        slow = getSumOfSquares(slow);
        fast = getSumOfSquares(getSumOfSquares(fast));
    } while (slow != fast);
    
    return slow == 1;
}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(log n) for HashSet, O(1) for Floyd's"
    },
    {
      id: 28,
      title: "Climbing Stairs",
      difficulty: "easy",
      category: "Dynamic Programming",
      problem: "Find number of ways to climb n stairs when you can climb 1 or 2 steps at a time.",
      company: "Amazon, Adobe",
      hints: [
        "This is Fibonacci sequence in disguise",
        "Ways to reach step n = ways to reach (n-1) + ways to reach (n-2)",
        "Base cases: 1 way for 1 stair, 2 ways for 2 stairs"
      ],
      solution: `public static int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev2 = 1; // ways to reach step 1
    int prev1 = 2; // ways to reach step 2
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Alternative DP approach
public static int climbStairsDP(int n) {
    if (n <= 2) return n;
    
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) for optimized, O(n) for DP array"
    },
    {
      id: 29,
      title: "Reverse Linked List",
      difficulty: "easy",
      category: "Linked List",
      problem: "Reverse a singly linked list iteratively and recursively.",
      company: "Facebook, Microsoft, Google",
      hints: [
        "Use three pointers: previous, current, next",
        "Reverse the link direction while traversing",
        "For recursion, reverse rest first then fix current link"
      ],
      solution: `// Iterative approach
public static ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

// Recursive approach
public static ListNode reverseListRecursive(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }
    
    ListNode reversedHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return reversedHead;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) for iterative, O(n) for recursive"
    },
    {
      id: 30,
      title: "Merge Two Sorted Lists",
      difficulty: "easy",
      category: "Linked List",
      problem: "Merge two sorted linked lists and return as new sorted list.",
      company: "Amazon, Google, Apple",
      hints: [
        "Use dummy node to simplify logic",
        "Compare values and attach smaller node",
        "Handle remaining nodes when one list is exhausted"
      ],
      solution: `public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes
    current.next = (list1 != null) ? list1 : list2;
    
    return dummy.next;
}

// Recursive approach
public static ListNode mergeTwoListsRecursive(ListNode list1, ListNode list2) {
    if (list1 == null) return list2;
    if (list2 == null) return list1;
    
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}`,
      timeComplexity: "O(m + n)",
      spaceComplexity: "O(1) for iterative, O(m + n) for recursive"
    },
    {
      id: 2,
      title: "Two Sum",
      difficulty: "easy",
      category: "Array",
      problem: "Given an array of integers and a target sum, return indices of two numbers that add up to the target.",
      company: "Google, Amazon, Facebook",
      hints: [
        "Use HashMap to store seen numbers and their indices",
        "For each number, check if its complement exists in the map",
        "Complement = target - current number"
      ],
      solution: `public static int[] twoSum(int[] nums, int target) {
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
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    {
      id: 31,
      title: "Linked List Cycle",
      difficulty: "easy",
      category: "Linked List",
      problem: "Determine if a linked list has a cycle using Floyd's algorithm.",
      company: "Microsoft, Amazon",
      hints: [
        "Use two pointers: slow (1 step) and fast (2 steps)",
        "If there's a cycle, fast will eventually meet slow",
        "If fast reaches null, there's no cycle"
      ],
      solution: `public static boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }
    
    ListNode slow = head;
    ListNode fast = head.next;
    
    while (slow != fast) {
        if (fast == null || fast.next == null) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return true;
}

// Alternative implementation
public static boolean hasCycleAlternative(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow == fast) {
            return true;
        }
    }
    
    return false;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 32,
      title: "Maximum Depth of Binary Tree",
      difficulty: "easy",
      category: "Tree",
      problem: "Find the maximum depth of a binary tree.",
      company: "Google, Facebook",
      hints: [
        "Use recursion to find depth of left and right subtrees",
        "Maximum depth = 1 + max(left depth, right depth)",
        "Base case: null node has depth 0"
      ],
      solution: `public static int maxDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }
    
    int leftDepth = maxDepth(root.left);
    int rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
}

// Iterative approach using level order traversal
public static int maxDepthIterative(TreeNode root) {
    if (root == null) return 0;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int depth = 0;
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        depth++;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
    }
    
    return depth;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) where h is height for recursive, O(w) where w is width for iterative"
    },
    {
      id: 33,
      title: "Same Tree",
      difficulty: "easy",
      category: "Tree",
      problem: "Check if two binary trees are the same.",
      company: "Amazon, Microsoft",
      hints: [
        "Compare values at each node",
        "Recursively check left and right subtrees",
        "Both null nodes are considered same"
      ],
      solution: `public static boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) {
        return true;
    }
    
    if (p == null || q == null) {
        return false;
    }
    
    if (p.val != q.val) {
        return false;
    }
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Iterative approach using stack
public static boolean isSameTreeIterative(TreeNode p, TreeNode q) {
    Stack<TreeNode> stack = new Stack<>();
    stack.push(p);
    stack.push(q);
    
    while (!stack.isEmpty()) {
        TreeNode node1 = stack.pop();
        TreeNode node2 = stack.pop();
        
        if (node1 == null && node2 == null) continue;
        if (node1 == null || node2 == null) return false;
        if (node1.val != node2.val) return false;
        
        stack.push(node1.left);
        stack.push(node2.left);
        stack.push(node1.right);
        stack.push(node2.right);
    }
    
    return true;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) for recursive, O(n) for iterative"
    },
    {
      id: 34,
      title: "Symmetric Tree",
      difficulty: "easy",
      category: "Tree",
      problem: "Check if a binary tree is symmetric (mirror of itself).",
      company: "Google, Microsoft",
      hints: [
        "A tree is symmetric if left subtree is mirror of right subtree",
        "Use helper function to compare two trees for mirror property",
        "Left of one should equal right of other"
      ],
      solution: `public static boolean isSymmetric(TreeNode root) {
    if (root == null) return true;
    return isMirror(root.left, root.right);
}

private static boolean isMirror(TreeNode left, TreeNode right) {
    if (left == null && right == null) return true;
    if (left == null || right == null) return false;
    
    return (left.val == right.val) && 
           isMirror(left.left, right.right) && 
           isMirror(left.right, right.left);
}

// Iterative approach
public static boolean isSymmetricIterative(TreeNode root) {
    if (root == null) return true;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root.left);
    queue.offer(root.right);
    
    while (!queue.isEmpty()) {
        TreeNode left = queue.poll();
        TreeNode right = queue.poll();
        
        if (left == null && right == null) continue;
        if (left == null || right == null) return false;
        if (left.val != right.val) return false;
        
        queue.offer(left.left);
        queue.offer(right.right);
        queue.offer(left.right);
        queue.offer(right.left);
    }
    
    return true;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) for recursive, O(n) for iterative"
    },
    {
      id: 35,
      title: "Path Sum",
      difficulty: "easy",
      category: "Tree",
      problem: "Check if tree has root-to-leaf path with given target sum.",
      company: "Amazon, Facebook",
      hints: [
        "Use recursion and subtract current node value from target",
        "Base case: leaf node with remaining target equal to node value",
        "Try both left and right paths"
      ],
      solution: `public static boolean hasPathSum(TreeNode root, int targetSum) {
    if (root == null) {
        return false;
    }
    
    // Leaf node
    if (root.left == null && root.right == null) {
        return targetSum == root.val;
    }
    
    int remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || 
           hasPathSum(root.right, remainingSum);
}

// Iterative approach using stack
public static boolean hasPathSumIterative(TreeNode root, int targetSum) {
    if (root == null) return false;
    
    Stack<TreeNode> nodeStack = new Stack<>();
    Stack<Integer> sumStack = new Stack<>();
    
    nodeStack.push(root);
    sumStack.push(targetSum - root.val);
    
    while (!nodeStack.isEmpty()) {
        TreeNode node = nodeStack.pop();
        int currentSum = sumStack.pop();
        
        if (node.left == null && node.right == null && currentSum == 0) {
            return true;
        }
        
        if (node.left != null) {
            nodeStack.push(node.left);
            sumStack.push(currentSum - node.left.val);
        }
        
        if (node.right != null) {
            nodeStack.push(node.right);
            sumStack.push(currentSum - node.right.val);
        }
    }
    
    return false;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) for recursive, O(n) for iterative"
    },
    {
      id: 36,
      title: "Search Insert Position",
      difficulty: "easy",
      category: "Binary Search",
      problem: "Find the index where target should be inserted in sorted array.",
      company: "Facebook, Microsoft",
      hints: [
        "Use binary search on sorted array",
        "If target found, return its index",
        "If not found, return the position where it should be inserted"
      ],
      solution: `public static int searchInsert(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Insert position
}

// Alternative approach
public static int searchInsertAlternative(int[] nums, int target) {
    int left = 0, right = nums.length;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 3,
      title: "Valid Parentheses",
      difficulty: "easy",
      category: "Stack",
      problem: "Given a string containing just characters '(', ')', '{', '}', '[', ']', determine if the input string is valid.",
      hints: [
        "Use a stack to keep track of opening brackets",
        "When you encounter a closing bracket, check if it matches the most recent opening bracket",
        "The string is valid if the stack is empty at the end"
      ],
      solution: `public static boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = new HashMap<>();
    map.put(')', '(');
    map.put('}', '{');
    map.put(']', '[');
    
    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) { // Closing bracket
            if (stack.isEmpty() || stack.pop() != map.get(c)) {
                return false;
            }
        } else { // Opening bracket
            stack.push(c);
        }
    }
    
    return stack.isEmpty();
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    {
      id: 4,
      title: "Maximum Subarray",
      difficulty: "medium",
      category: "Array",
      problem: "Find the contiguous subarray with the largest sum and return its sum (Kadane's Algorithm).",
      hints: [
        "Use dynamic programming approach",
        "Keep track of maximum sum ending at current position",
        "At each step, decide whether to extend existing subarray or start new one"
      ],
      solution: `public static int maxSubArray(int[] nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Alternative implementation
public static int maxSubArrayAlternative(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    int currentSum = 0;
    
    for (int num : nums) {
        currentSum += num;
        maxSum = Math.max(maxSum, currentSum);
        
        if (currentSum < 0) {
            currentSum = 0; // Reset if sum becomes negative
        }
    }
    
    return maxSum;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 5,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "medium",
      category: "String",
      problem: "Given a string, find the length of the longest substring without repeating characters.",
      hints: [
        "Use sliding window technique with two pointers",
        "Use a HashSet to keep track of characters in current window",
        "Expand window by moving right pointer, shrink by moving left pointer when duplicate found"
      ],
      solution: `public static int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int left = 0, maxLength = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char rightChar = s.charAt(right);
        
        while (set.contains(rightChar)) {
            set.remove(s.charAt(left));
            left++;
        }
        
        set.add(rightChar);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Alternative using HashMap to store character indices
public static int lengthOfLongestSubstringOptimized(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int left = 0, maxLength = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char rightChar = s.charAt(right);
        
        if (map.containsKey(rightChar)) {
            left = Math.max(left, map.get(rightChar) + 1);
        }
        
        map.put(rightChar, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m, n)) where m is charset size"
    },
    {
      id: 6,
      title: "Container With Most Water",
      difficulty: "medium",
      category: "Array",
      problem: "Given n non-negative integers representing heights, find two lines that together with x-axis forms a container that holds the most water.",
      hints: [
        "Use two pointers at the beginning and end",
        "The area is determined by the shorter line",
        "Move the pointer of the shorter line to potentially find a larger area"
      ],
      solution: `public static int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int maxArea = 0;
    
    while (left < right) {
        int width = right - left;
        int currentArea = width * Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, currentArea);
        
        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 7,
      title: "3Sum",
      difficulty: "medium",
      category: "Array",
      problem: "Given an array, find all unique triplets that sum to zero.",
      hints: [
        "Sort the array first",
        "Use three pointers: fix first element, use two pointers for remaining",
        "Skip duplicates to avoid duplicate triplets"
      ],
      solution: `public static List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(nums);
    
    for (int i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        
        int left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                
                // Skip duplicates
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}`,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1) excluding output array"
    },
    {
      id: 8,
      title: "Binary Tree Level Order Traversal",
      difficulty: "medium",
      category: "Tree",
      problem: "Given a binary tree, return the level order traversal of its nodes' values (level by level).",
      hints: [
        "Use BFS with a queue",
        "Process nodes level by level",
        "Keep track of nodes at each level separately"
      ],
      solution: `public static List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        
        result.add(currentLevel);
    }
    
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(w) where w is maximum width of tree"
    },
    {
      id: 9,
      title: "Number of Islands",
      difficulty: "medium",
      category: "Graph",
      problem: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands.",
      hints: [
        "Use DFS or BFS to explore connected components",
        "When you find a '1', increment island count and mark all connected '1's as visited",
        "Use DFS to mark all cells of current island"
      ],
      solution: `public static int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;
    
    int islands = 0;
    int rows = grid.length;
    int cols = grid[0].length;
    
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == '1') {
                islands++;
                dfs(grid, i, j);
            }
        }
    }
    
    return islands;
}

private static void dfs(char[][] grid, int i, int j) {
    int rows = grid.length;
    int cols = grid[0].length;
    
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] == '0') {
        return;
    }
    
    grid[i][j] = '0'; // Mark as visited
    
    // Explore all 4 directions
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}`,
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(m × n) in worst case due to recursion"
    },
    {
      id: 10,
      title: "Merge Intervals",
      difficulty: "medium",
      category: "Array",
      problem: "Given a collection of intervals, merge all overlapping intervals.",
      hints: [
        "Sort intervals by start time",
        "Iterate through sorted intervals and merge overlapping ones",
        "Two intervals overlap if start of second <= end of first"
      ],
      solution: `public static int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    List<int[]> merged = new ArrayList<>();
    int[] currentInterval = intervals[0];
    merged.add(currentInterval);
    
    for (int[] interval : intervals) {
        int currentEnd = currentInterval[1];
        int nextStart = interval[0];
        int nextEnd = interval[1];
        
        if (currentEnd >= nextStart) {
            // Overlapping intervals, merge them
            currentInterval[1] = Math.max(currentEnd, nextEnd);
        } else {
            // Non-overlapping interval, add it to result
            currentInterval = interval;
            merged.add(currentInterval);
        }
    }
    
    return merged.toArray(new int[merged.size()][]);
}`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1) excluding output array"
    },
    {
      id: 11,
      title: "Word Break",
      difficulty: "hard",
      category: "Dynamic Programming",
      problem: "Given a string and a dictionary of words, determine if the string can be segmented into words from the dictionary.",
      hints: [
        "Use dynamic programming",
        "dp[i] represents whether substring s[0:i] can be segmented",
        "For each position, check if any previous valid segment + current word forms a valid segmentation"
      ],
      solution: `public static boolean wordBreak(String s, List<String> wordDict) {
    Set<String> wordSet = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true; // Empty string can always be segmented
    
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length()];
}`,
      timeComplexity: "O(n² × m) where n is string length, m is average word length",
      spaceComplexity: "O(n)"
    },
    {
      id: 12,
      title: "Serialize and Deserialize Binary Tree",
      difficulty: "hard",
      category: "Tree",
      problem: "Design an algorithm to serialize and deserialize a binary tree.",
      hints: [
        "Use preorder traversal for serialization",
        "Use markers (like 'null') for missing nodes",
        "For deserialization, build tree recursively using the same order"
      ],
      solution: `public class Codec {
    private static final String DELIMITER = ",";
    private static final String NULL_NODE = "null";
    
    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }
    
    private void serializeHelper(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append(NULL_NODE).append(DELIMITER);
            return;
        }
        
        sb.append(node.val).append(DELIMITER);
        serializeHelper(node.left, sb);
        serializeHelper(node.right, sb);
    }
    
    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(DELIMITER)));
        return deserializeHelper(queue);
    }
    
    private TreeNode deserializeHelper(Queue<String> queue) {
        String val = queue.poll();
        
        if (NULL_NODE.equals(val)) {
            return null;
        }
        
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserializeHelper(queue);
        node.right = deserializeHelper(queue);
        
        return node;
    }
}`,
      timeComplexity: "O(n) for both serialize and deserialize",
      spaceComplexity: "O(n)"
    },
    {
      id: 13,
      title: "Sliding Window Maximum",
      difficulty: "hard",
      category: "Array",
      problem: "Given an array and a sliding window of size k, find the maximum element in each window.",
      hints: [
        "Use a deque to store indices of elements",
        "Maintain deque in decreasing order of element values",
        "Remove indices that are out of current window"
      ],
      solution: `public static int[] maxSlidingWindow(int[] nums, int k) {
    if (nums == null || nums.length == 0) return new int[0];
    
    int[] result = new int[nums.length - k + 1];
    Deque<Integer> deque = new ArrayDeque<>(); // Store indices
    
    for (int i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
            deque.pollFirst();
        }
        
        // Remove indices whose corresponding values are smaller than current
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
            deque.pollLast();
        }
        
        deque.offerLast(i);
        
        // Start recording results when window size reaches k
        if (i >= k - 1) {
            result[i - k + 1] = nums[deque.peekFirst()];
        }
    }
    
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)"
    },
    {
      id: 14,
      title: "Longest Palindromic Substring",
      difficulty: "medium",
      category: "String",
      problem: "Given a string, find the longest palindromic substring.",
      hints: [
        "Expand around centers approach",
        "For each character, expand around it as center",
        "Consider both odd and even length palindromes"
      ],
      solution: `public static String longestPalindrome(String s) {
    if (s == null || s.length() == 0) return "";
    
    int start = 0, maxLength = 1;
    
    for (int i = 0; i < s.length(); i++) {
        // Check for odd length palindromes
        int len1 = expandAroundCenter(s, i, i);
        // Check for even length palindromes
        int len2 = expandAroundCenter(s, i, i + 1);
        
        int currentMaxLength = Math.max(len1, len2);
        
        if (currentMaxLength > maxLength) {
            maxLength = currentMaxLength;
            start = i - (currentMaxLength - 1) / 2;
        }
    }
    
    return s.substring(start, start + maxLength);
}

private static int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}`,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)"
    },
    {
      id: 15,
      title: "First Non-Repeating Character",
      difficulty: "easy",
      category: "String",
      problem: "Find the first non-repeating character in a string and return its index.",
      hints: [
        "Use HashMap to count frequency of each character",
        "Make two passes: first to count, second to find first with count 1"
      ],
      solution: `public static int firstUniqChar(String s) {
    Map<Character, Integer> charCount = new HashMap<>();
    
    // Count frequency of each character
    for (char c : s.toCharArray()) {
        charCount.put(c, charCount.getOrDefault(c, 0) + 1);
    }
    
    // Find first character with frequency 1
    for (int i = 0; i < s.length(); i++) {
        if (charCount.get(s.charAt(i)) == 1) {
            return i;
        }
    }
    
    return -1; // No unique character found
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) - at most 26 characters in English alphabet"
    }
  ];

  const toggleHint = (questionId) => {
    setShowHints(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleSolution = (questionId) => {
    setShowSolutions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const filteredQuestions = selectedDifficulty === 'all' 
    ? questions 
    : questions.filter(q => q.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  };

  return (
    <div className="fade-in">
      <div className="card">
        <h1>🎯 Coding Practice Questions</h1>
        <p>Test your knowledge with these carefully selected coding problems from easy to hard difficulty.</p>
        
        <div style={{marginTop: '20px'}}>
          <h3>Filter by Difficulty:</h3>
          <div>
            <button 
              className={`btn ${selectedDifficulty === 'all' ? 'btn-secondary' : ''}`}
              onClick={() => setSelectedDifficulty('all')}
            >
              All ({questions.length})
            </button>
            <button 
              className={`btn ${selectedDifficulty === 'easy' ? 'btn-secondary' : ''}`}
              onClick={() => setSelectedDifficulty('easy')}
            >
              Easy ({questions.filter(q => q.difficulty === 'easy').length})
            </button>
            <button 
              className={`btn ${selectedDifficulty === 'medium' ? 'btn-secondary' : ''}`}
              onClick={() => setSelectedDifficulty('medium')}
            >
              Medium ({questions.filter(q => q.difficulty === 'medium').length})
            </button>
            <button 
              className={`btn ${selectedDifficulty === 'hard' ? 'btn-secondary' : ''}`}
              onClick={() => setSelectedDifficulty('hard')}
            >
              Hard ({questions.filter(q => q.difficulty === 'hard').length})
            </button>
          </div>
        </div>
      </div>

      {filteredQuestions.map((question) => (
        <div key={question.id} className="question-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px'}}>
            <h2 style={{margin: 0}}>{question.id}. {question.title}</h2>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <span className="difficulty-badge" style={{backgroundColor: '#6c757d'}}>{question.category}</span>
              <span className={`difficulty-badge ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty.toUpperCase()}
              </span>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h3>Problem:</h3>
            <p>{question.problem}</p>
          </div>

          <div style={{marginBottom: '15px'}}>
            <button 
              className="btn"
              onClick={() => toggleHint(question.id)}
            >
              {showHints[question.id] ? 'Hide Hints' : 'Show Hints'} 💡
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => toggleSolution(question.id)}
            >
              {showSolutions[question.id] ? 'Hide Solution' : 'Show Solution'} 🔍
            </button>
          </div>

          {showHints[question.id] && (
            <div className="hint-section">
              <h4>💡 Hints:</h4>
              <ol>
                {question.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ol>
            </div>
          )}

          {showSolutions[question.id] && (
            <div style={{marginTop: '20px'}}>
              <h3>✅ Solution:</h3>
              <div className="code-block">
                <pre>{question.solution}</pre>
              </div>
              <div style={{marginTop: '15px', display: 'flex', gap: '20px'}}>
                <div>
                  <strong>⏱️ Time Complexity:</strong> {question.timeComplexity}
                </div>
                <div>
                  <strong>💾 Space Complexity:</strong> {question.spaceComplexity}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="card">
        <h2>📚 Additional Practice Resources</h2>
        <div className="grid-2">
          <div>
            <h3>Online Platforms</h3>
            <ul>
              <li>LeetCode - Extensive problem collection</li>
              <li>HackerRank - Structured learning paths</li>
              <li>CodeChef - Competitive programming</li>
              <li>Codeforces - Algorithm contests</li>
              <li>InterviewBit - Interview-focused problems</li>
            </ul>
          </div>
          <div>
            <h3>Study Tips</h3>
            <ul>
              <li>Start with easy problems and gradually increase difficulty</li>
              <li>Time yourself while solving problems</li>
              <li>Focus on understanding patterns and approaches</li>
              <li>Practice explaining your solution out loud</li>
              <li>Review and optimize your solutions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>🏆 Problem Categories & Patterns</h2>
        <div className="grid-3">
          <div>
            <h3>Array & String</h3>
            <ul>
              <li>Two Pointers</li>
              <li>Sliding Window</li>
              <li>Prefix Sum</li>
              <li>Binary Search</li>
            </ul>
          </div>
          <div>
            <h3>Trees & Graphs</h3>
            <ul>
              <li>DFS & BFS</li>
              <li>Tree Traversals</li>
              <li>Graph Algorithms</li>
              <li>Union Find</li>
            </ul>
          </div>
          <div>
            <h3>Dynamic Programming</h3>
            <ul>
              <li>Memoization</li>
              <li>Tabulation</li>
              <li>State Machines</li>
              <li>Optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestions;
