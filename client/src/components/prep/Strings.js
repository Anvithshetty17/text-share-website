import React, { useState } from 'react';

const Strings = () => {
  const [activeMethod, setActiveMethod] = useState(null);

  const stringMethods = [
    {
      name: 'length()',
      signature: 'public int length()',
      description: 'Returns the length of the string',
      example: `String str = "Hello World";
int len = str.length(); // Returns 11`,
      useCase: 'Validating input length, loop conditions, array sizing'
    },
    {
      name: 'charAt()',
      signature: 'public char charAt(int index)',
      description: 'Returns the character at the specified index',
      example: `String str = "Java";
char ch = str.charAt(0); // Returns 'J'`,
      useCase: 'Character manipulation, palindrome checking, pattern matching'
    },
    {
      name: 'substring()',
      signature: 'public String substring(int beginIndex, int endIndex)',
      description: 'Returns a substring from beginIndex to endIndex-1',
      example: `String str = "Programming";
String sub = str.substring(0, 4); // Returns "Prog"`,
      useCase: 'Text parsing, extracting parts of strings, tokenization'
    },
    {
      name: 'indexOf()',
      signature: 'public int indexOf(String str)',
      description: 'Returns the index of first occurrence of substring',
      example: `String text = "Java Programming";
int index = text.indexOf("Pro"); // Returns 5`,
      useCase: 'Search operations, finding patterns, validation'
    },
    {
      name: 'toLowerCase()',
      signature: 'public String toLowerCase()',
      description: 'Converts all characters to lowercase',
      example: `String str = "HELLO";
String lower = str.toLowerCase(); // Returns "hello"`,
      useCase: 'Case-insensitive comparisons, data normalization'
    },
    {
      name: 'toUpperCase()',
      signature: 'public String toUpperCase()',
      description: 'Converts all characters to uppercase',
      example: `String str = "hello";
String upper = str.toUpperCase(); // Returns "HELLO"`,
      useCase: 'Data formatting, display purposes, standardization'
    },
    {
      name: 'trim()',
      signature: 'public String trim()',
      description: 'Removes leading and trailing whitespaces',
      example: `String str = "  Hello World  ";
String trimmed = str.trim(); // Returns "Hello World"`,
      useCase: 'Input validation, data cleaning, form processing'
    },
    {
      name: 'replace()',
      signature: 'public String replace(char oldChar, char newChar)',
      description: 'Replaces all occurrences of oldChar with newChar',
      example: `String str = "Hello World";
String replaced = str.replace('l', 'x'); // Returns "Hexxo Worxd"`,
      useCase: 'Text substitution, data transformation, formatting'
    },
    {
      name: 'split()',
      signature: 'public String[] split(String regex)',
      description: 'Splits the string based on regex pattern',
      example: `String str = "apple,banana,orange";
String[] fruits = str.split(","); // Returns ["apple", "banana", "orange"]`,
      useCase: 'CSV parsing, tokenization, data extraction'
    },
    {
      name: 'equals()',
      signature: 'public boolean equals(Object obj)',
      description: 'Compares strings for equality (case-sensitive)',
      example: `String str1 = "Java";
String str2 = "Java";
boolean isEqual = str1.equals(str2); // Returns true`,
      useCase: 'String comparison, validation, authentication'
    },
    {
      name: 'equalsIgnoreCase()',
      signature: 'public boolean equalsIgnoreCase(String str)',
      description: 'Compares strings ignoring case differences',
      example: `String str1 = "Java";
String str2 = "JAVA";
boolean isEqual = str1.equalsIgnoreCase(str2); // Returns true`,
      useCase: 'Case-insensitive validation, user input processing'
    },
    {
      name: 'contains()',
      signature: 'public boolean contains(CharSequence s)',
      description: 'Checks if string contains the specified sequence',
      example: `String str = "Java Programming";
boolean contains = str.contains("Program"); // Returns true`,
      useCase: 'Search functionality, filtering, validation'
    },
    {
      name: 'startsWith()',
      signature: 'public boolean startsWith(String prefix)',
      description: 'Checks if string starts with specified prefix',
      example: `String str = "JavaScript";
boolean starts = str.startsWith("Java"); // Returns true`,
      useCase: 'URL validation, file extension checking, prefix matching'
    },
    {
      name: 'endsWith()',
      signature: 'public boolean endsWith(String suffix)',
      description: 'Checks if string ends with specified suffix',
      example: `String filename = "document.pdf";
boolean isPdf = filename.endsWith(".pdf"); // Returns true`,
      useCase: 'File type validation, suffix checking, pattern matching'
    },
    {
      name: 'isEmpty()',
      signature: 'public boolean isEmpty()',
      description: 'Checks if string length is 0',
      example: `String str = "";
boolean empty = str.isEmpty(); // Returns true`,
      useCase: 'Input validation, null checking, form validation'
    }
  ];

  const commonPatterns = [
    {
      title: 'Palindrome Check',
      code: `public static boolean isPalindrome(String str) {
    str = str.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
    int left = 0, right = str.length() - 1;
    
    while (left < right) {
        if (str.charAt(left) != str.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`,
      useCase: 'String validation, pattern recognition'
    },
    {
      title: 'Anagram Check',
      code: `public static boolean areAnagrams(String str1, String str2) {
    if (str1.length() != str2.length()) return false;
    
    char[] arr1 = str1.toLowerCase().toCharArray();
    char[] arr2 = str2.toLowerCase().toCharArray();
    
    Arrays.sort(arr1);
    Arrays.sort(arr2);
    
    return Arrays.equals(arr1, arr2);
}`,
      useCase: 'Word games, text analysis, cryptography'
    },
    {
      title: 'Reverse String',
      code: `public static String reverseString(String str) {
    StringBuilder sb = new StringBuilder(str);
    return sb.reverse().toString();
}

// Alternative approach
public static String reverseStringManual(String str) {
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
}`,
      useCase: 'Text manipulation, algorithm practice'
    }
  ];

  return (
    <div className="fade-in">
      <div className="card">
        <h1>🔤 Java String Methods & Operations</h1>
        <p>Master all essential String methods with practical examples and real-world use cases.</p>
      </div>

      <div className="card">
        <h2>📋 Essential String Methods</h2>
        <div className="method-list">
          {stringMethods.map((method, index) => (
            <div key={index} className="method-item">
              <div className="method-signature">{method.signature}</div>
              <div className="method-description">{method.description}</div>
              <button 
                className="btn"
                onClick={() => setActiveMethod(activeMethod === index ? null : index)}
              >
                {activeMethod === index ? 'Hide Example' : 'Show Example'}
              </button>
              
              {activeMethod === index && (
                <div style={{marginTop: '15px'}}>
                  <h4>Example:</h4>
                  <div className="code-block">
                    <pre>{method.example}</pre>
                  </div>
                  <h4>Use Case:</h4>
                  <p><strong>{method.useCase}</strong></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>🎯 Common String Algorithms</h2>
        {commonPatterns.map((pattern, index) => (
          <div key={index} style={{marginBottom: '25px'}}>
            <h3>{pattern.title}</h3>
            <div className="code-block">
              <pre>{pattern.code}</pre>
            </div>
            <p><strong>Use Case:</strong> {pattern.useCase}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>💡 String Performance Tips</h2>
        <div className="grid-2">
          <div>
            <h3>StringBuilder vs String</h3>
            <div className="code-block">
              <pre>{`// Inefficient - Creates multiple String objects
String result = "";
for (int i = 0; i < 1000; i++) {
    result += "a"; // O(n²) time complexity
}

// Efficient - Uses StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append("a"); // O(n) time complexity
}
String result = sb.toString();`}</pre>
            </div>
          </div>
          
          <div>
            <h3>String Comparison</h3>
            <div className="code-block">
              <pre>{`// Wrong way - may not work as expected
String str1 = new String("Hello");
String str2 = new String("Hello");
if (str1 == str2) { // Compares references
    // This won't execute
}

// Correct way - compares content
if (str1.equals(str2)) {
    // This will execute
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>🔍 Interview Questions Preview</h2>
        <ul className="tip-list">
          <li>Find the first non-repeating character in a string</li>
          <li>Check if two strings are rotations of each other</li>
          <li>Implement string compression (e.g., "aabcccccaaa" → "a2b1c5a3")</li>
          <li>Find all permutations of a string</li>
          <li>Longest common subsequence between two strings</li>
        </ul>
        <p><em>Navigate to the Practice Questions section for detailed solutions!</em></p>
      </div>
    </div>
  );
};

export default Strings;
