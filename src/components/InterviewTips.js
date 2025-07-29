import React from 'react';

const InterviewTips = () => {
  return (
    <div className="fade-in">
      <div className="card">
        <h1>🎯 Coding Interview Success Guide</h1>
        <p>Complete preparation strategy and tips to ace your coding interviews.</p>
      </div>

      <div className="card">
        <h2>📋 Before the Interview</h2>
        <div className="grid-2">
          <div>
            <h3>📚 Study Plan (4-8 weeks)</h3>
            <ul>
              <li><strong>Week 1-2:</strong> Arrays, Strings, Basic Data Structures</li>
              <li><strong>Week 3-4:</strong> Trees, Graphs, Hash Tables</li>
              <li><strong>Week 5-6:</strong> Dynamic Programming, Backtracking</li>
              <li><strong>Week 7-8:</strong> Advanced topics, Mock interviews</li>
            </ul>
          </div>
          <div>
            <h3>🛠️ Setup & Environment</h3>
            <ul>
              <li>Practice on platforms like LeetCode, HackerRank</li>
              <li>Use an IDE you're comfortable with</li>
              <li>Practice writing code on paper/whiteboard</li>
              <li>Time yourself while solving problems</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>🗣️ During the Interview</h2>
        
        <h3>1. Problem Understanding Phase</h3>
        <div className="code-block">
          <pre>{`Example Questions to Ask:
• "Can you clarify the input format?"
• "What should I return if the input is empty?"
• "Are there any constraints on the input size?"
• "Can the array contain duplicates?"
• "Should I consider edge cases like negative numbers?"

Example Clarification:
Interviewer: "Find the maximum sum of a subarray"
You: "Should I consider empty subarrays? What if all numbers are negative?"`}</pre>
        </div>

        <h3>2. Approach Discussion</h3>
        <div className="grid-2">
          <div>
            <h4>✅ Do This:</h4>
            <ul>
              <li>Think out loud</li>
              <li>Start with brute force</li>
              <li>Discuss time/space complexity</li>
              <li>Ask if you should optimize</li>
              <li>Trace through an example</li>
            </ul>
          </div>
          <div>
            <h4>❌ Avoid This:</h4>
            <ul>
              <li>Jumping straight to code</li>
              <li>Silent thinking for too long</li>
              <li>Ignoring edge cases</li>
              <li>Not explaining your approach</li>
              <li>Getting stuck on optimization initially</li>
            </ul>
          </div>
        </div>

        <h3>3. Coding Phase</h3>
        <div className="code-block">
          <pre>{`Best Practices:
• Write clean, readable code
• Use meaningful variable names
• Add comments for complex logic
• Handle edge cases
• Test with examples

Example:
// Find two numbers that sum to target
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        
        seen.put(nums[i], i);
    }
    
    return new int[]{}; // No solution found
}`}</pre>
        </div>

        <h3>4. Testing & Debugging</h3>
        <ul>
          <li>Walk through your code with the given example</li>
          <li>Test edge cases (empty input, single element, etc.)</li>
          <li>Look for off-by-one errors</li>
          <li>Check for null pointer exceptions</li>
          <li>Verify time and space complexity</li>
        </ul>
      </div>

      <div className="card">
        <h2>🧠 Problem-Solving Framework</h2>
        
        <div className="method-item">
          <h3>UMPIRE Method</h3>
          <ul>
            <li><strong>U</strong>nderstand - Clarify the problem</li>
            <li><strong>M</strong>atch - Identify patterns/similar problems</li>
            <li><strong>P</strong>lan - Design your approach</li>
            <li><strong>I</strong>mplement - Write clean code</li>
            <li><strong>R</strong>eview - Test and debug</li>
            <li><strong>E</strong>valuate - Analyze complexity and optimize</li>
          </ul>
        </div>

        <div className="code-block">
          <pre>{`Example: "Reverse a Linked List"

U - Understand:
  • Input: Head of a singly linked list
  • Output: Head of reversed list
  • Edge cases: Empty list, single node

M - Match:
  • Similar to array reversal but with pointers
  • Pattern: Iterative pointer manipulation

P - Plan:
  • Use three pointers: prev, current, next
  • Iterate through list, reversing links

I - Implement:
  public ListNode reverseList(ListNode head) {
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

R - Review:
  • Test with [1,2,3] → [3,2,1]
  • Test edge cases: null, single node

E - Evaluate:
  • Time: O(n), Space: O(1)
  • Optimal solution`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>🚨 Common Mistakes to Avoid</h2>
        <div className="grid-2">
          <div>
            <h3>Technical Mistakes</h3>
            <ul>
              <li>Array index out of bounds</li>
              <li>Null pointer exceptions</li>
              <li>Infinite loops</li>
              <li>Integer overflow</li>
              <li>Forgetting to return a value</li>
              <li>Modifying input when not allowed</li>
            </ul>
          </div>
          <div>
            <h3>Communication Mistakes</h3>
            <ul>
              <li>Not asking clarifying questions</li>
              <li>Coding in silence</li>
              <li>Not explaining approach</li>
              <li>Arguing with interviewer</li>
              <li>Giving up too easily</li>
              <li>Not testing the solution</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>💡 Optimization Strategies</h2>
        
        <h3>Time Complexity Optimization</h3>
        <div className="code-block">
          <pre>{`Common Optimization Patterns:

1. Hash Table for O(1) lookups
   Before: Linear search O(n)
   After: Hash table lookup O(1)

2. Two Pointers for sorted arrays
   Before: Nested loops O(n²)
   After: Two pointers O(n)

3. Sliding Window for subarrays
   Before: Recalculate each window O(n²)
   After: Slide window O(n)

4. Binary Search for sorted data
   Before: Linear search O(n)
   After: Binary search O(log n)

5. Dynamic Programming for recursion
   Before: Exponential recursion O(2^n)
   After: DP with memoization O(n)`}</pre>
        </div>

        <h3>Space Complexity Optimization</h3>
        <div className="code-block">
          <pre>{`Space Optimization Techniques:

1. In-place algorithms
   Modify input array instead of creating new one

2. Constant extra space
   Use variables instead of additional data structures

3. Iterative vs Recursive
   Avoid recursion stack space

Example - Fibonacci:
// Space: O(n)
int[] dp = new int[n + 1];

// Space: O(1) - Optimized
int prev2 = 0, prev1 = 1;
for (int i = 2; i <= n; i++) {
    int current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
}`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>📞 System Design Interview Tips</h2>
        <div className="grid-2">
          <div>
            <h3>Approach</h3>
            <ul>
              <li>Clarify requirements and scope</li>
              <li>Estimate scale (users, data, QPS)</li>
              <li>Design high-level architecture</li>
              <li>Deep dive into components</li>
              <li>Address scalability and reliability</li>
              <li>Discuss trade-offs</li>
            </ul>
          </div>
          <div>
            <h3>Key Topics</h3>
            <ul>
              <li>Load balancing</li>
              <li>Database design (SQL vs NoSQL)</li>
              <li>Caching strategies</li>
              <li>Microservices architecture</li>
              <li>Message queues</li>
              <li>CDN and geographic distribution</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>🎭 Behavioral Interview Preparation</h2>
        
        <h3>STAR Method</h3>
        <div className="method-item">
          <ul>
            <li><strong>S</strong>ituation - Describe the context</li>
            <li><strong>T</strong>ask - Explain the challenge/responsibility</li>
            <li><strong>A</strong>ction - Detail what you did</li>
            <li><strong>R</strong>esult - Share the outcome and what you learned</li>
          </ul>
        </div>

        <h3>Common Questions</h3>
        <ul>
          <li>"Tell me about a challenging project you worked on"</li>
          <li>"Describe a time when you had to learn a new technology quickly"</li>
          <li>"How do you handle disagreements with team members?"</li>
          <li>"Tell me about a time you failed and what you learned"</li>
          <li>"Why do you want to work at our company?"</li>
        </ul>
      </div>

      <div className="card">
        <h2>📅 Final Week Preparation</h2>
        <div className="grid-3">
          <div>
            <h3>3 Days Before</h3>
            <ul>
              <li>Review core algorithms</li>
              <li>Practice on whiteboard</li>
              <li>Mock interview with friend</li>
              <li>Research the company</li>
            </ul>
          </div>
          <div>
            <h3>1 Day Before</h3>
            <ul>
              <li>Light review only</li>
              <li>Get good sleep</li>
              <li>Prepare questions to ask</li>
              <li>Plan your route/setup</li>
            </ul>
          </div>
          <div>
            <h3>Interview Day</h3>
            <ul>
              <li>Arrive early</li>
              <li>Stay calm and confident</li>
              <li>Listen carefully</li>
              <li>Think before coding</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>❓ Questions to Ask Interviewer</h2>
        <div className="grid-2">
          <div>
            <h3>About the Role</h3>
            <ul>
              <li>"What does a typical day look like?"</li>
              <li>"What are the biggest challenges facing the team?"</li>
              <li>"How do you measure success in this role?"</li>
              <li>"What technologies does the team use?"</li>
            </ul>
          </div>
          <div>
            <h3>About the Company</h3>
            <ul>
              <li>"How has the company culture evolved?"</li>
              <li>"What are the growth opportunities?"</li>
              <li>"How does the company support learning and development?"</li>
              <li>"What excites you most about working here?"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTips;
