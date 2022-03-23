# 1. Two Sum

- Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

- 給一個陣列 和目標數字, 輸出 兩個索引號 是他們的值加起來是目標數

- You may assume that each input would have exactly one solution, and you may not use the same element twice.

- You can return the answer in any order.

```javascript
- Example 1:

  - Input: nums = [2,7,11,15], target = 9
  - Output: [0,1]
  - Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

- Example 2:

  - Input: nums = [3,2,4], target = 6
  - Output: [1,2]

- Example 3:

  - Input: nums = [3,3], target = 6
  - Output: [0,1]

- Constraints:

  - 2 <= nums.length <= 104
  - -109 <= nums[i] <= 109
  - -109 <= target <= 109
  - Only one valid answer exists.

- Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
```

```javascript
var twoSum = function (nums, target) {
  let hash = {};
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    console.log(hash, n, target, i);
    if (hash[target - n] !== undefined) {
      console.log(i);
      return [hash[target - n], i];
    }
    hash[n] = i;
  }
  return [];
};

console.log(twoSum([2, 7, 11, 15], 18));
```

- nums 是陣列, target 是目標數字, hash 是物件, for 迴圈的設定是 i = 0; i < nums.length; i++, 迴圈內定義 常數 n 來跑 nums 這個陣列內的值, if 的條件是 hash 這個物件 的 key 值, 只要不是 undefined 就要回傳 hash 內的 value, 和 i, 如果不符合條件 定義 hash 的 key 和 value, 如果 for 迴圈跑完 都不符合條件 就迴傳一個空的陣列.

- 結論: 因為只要輸出兩個 陣列 中的 key aka index, 兩個得值加總就是 目標, 將 陣列中的值 存在 hash 中當作 key, 當 if 條件中 hash[target - n] 得出 hash[key] (只要存在 1 ,若不存在 undefined), 當存在時就是找到了 , 就可以回傳 陣列的 key aka index

- 原理就是 一邊比對 一邊把陣列的 key value 存到另一個 物件中, 當比對的兩個數字相加就是 目標時 就可以回報 key 了.

---

# 2. Add Two Numbers

- You are given two non-empty linked lists representing two non-negative integers.
- The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

- You may assume the two numbers do not contain any leading zero, except the number 0 itself.

```javascript
- Example 1:

  - Input: l1 = [2,4,3], l2 = [5,6,4]
  - Output: [7,0,8]
  - Explanation: 342 + 465 = 807.

- Example 2:

  - Input: l1 = [0], l2 = [0]
  - Output: [0]

- Example 3:

  - Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
  - Output: [8,9,9,9,0,0,0,1]

- Constraints:

- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.
```

```javascript
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
let n1 = new ListNode(2);
let n2 = new ListNode(4);
let n3 = new ListNode(3);
n1.next = n2;
n2.next = n3;

let m1 = new ListNode(5);
let m2 = new ListNode(6);
let m3 = new ListNode(4);
m1.next = m2;
m2.next = m3;
// 上面是將 array 轉成 ListNode 的原理
```

- 必須先將 array 變成 linked list 物件 在當作參數帶入 addTwoNumbers 這個 function 才成立, addTwoNumbers 大概就是自動化處理資料的方法.

```javascript
var addTwoNumbers = function (list1, list2) {
  return add(list1, list2, 0);

  function add(l1, l2, carry) {
    const v1 = (l1 && l1.val) || 0;
    const v2 = (l2 && l2.val) || 0;
    const sum = v1 + v2 + carry;
    const newCarry = Math.floor(sum / 10);
    const val = sum % 10;

    return l1 || l2 || carry
      ? {
          val,
          next: add(l1 && l1.next, l2 && l2.next, newCarry),
        }
      : null;
  }
};
```

- 這是利用遞迴的方法 注意 function add(l1, l2, carry){.... return li || l2 || carry ? { val, next: add(l1 && l1.next, l2 && l2.next, newCarry)}} , 在 function 內 add() 又再次帶著參數 被執行了 直到 參數鏈 沒了.
- 這題的重點是 參數是 ListNode, 去做兩個 ListNode 的加總, 而更改 val 的值, 再利用 next 這個 key 再帶入下一個 物件 這個特性, 當作參數 再次執行 add() 這個 function.

```javascript
var addTwoNumbers = function (l1, l2) {
  var List = new ListNode(0);
  var head = List;
  var sum = 0;
  var carry = 0;

  while (l1 !== null || l2 !== null || sum > 0) {
    if (l1 !== null) {
      sum = sum + l1.val;
      l1 = l1.next;
    }
    console.log(sum);
    if (l2 !== null) {
      sum = sum + l2.val;
      l2 = l2.next;
    }
    if (sum >= 10) {
      carry = 1;
      sum = sum - 10;
    }

    head.next = new ListNode(sum);
    head = head.next;

    sum = carry;
    carry = 0;
  }

  return List.next;
};
```

- 這個就是中規中矩的作法, 利用 while 只有條件不滿足才會停止迴圈這個特性, 去循環 更動 ListNode 內的值
- ListNode 說穿了其實 就是一個物件 利用 key value 形成物件內有一個物件, 再利用 key 進入物件, 就像鍊條的樣子
- sum 會去處理 l1,l2.val 的值, 如果數字超過 10, carry 就會 +1, aka 10 進位, 用 carry 儲存進位的數.
- 最後的 List.next 是為了避掉 初始值的 ListNode(0) 產生的物件內容.

---

# 3. Longest Substring Without Repeating Characters

- Given a string s, find the length of the longest substring without repeating characters.

```javascript
- Example 1:

  - Input: s = "abcabcbb"
  - Output: 3
  - Explanation: The answer is "abc", with the length of 3.

- Example 2:

  - Input: s = "bbbbb"
  - Output: 1
  - Explanation: The answer is "b", with the length of 1.

- Example 3:

  - Input: s = "pwwkew"
  - Output: 3
  - Explanation: The answer is "wke", with the length of 3.

- Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

- Constraints:

  - 0 <= s.length <= 5 \* 104
  - s consists of English letters, digits, symbols and spaces.
```

```javascript
function lengthOfLongestSubstring(s) {
  const map = {};
  var left = 0;

  return s.split("").reduce((max, v, i) => {
    left = map[v] >= left ? map[v] + 1 : left;
    map[v] = i;
    return Math.max(max, i - left + 1);
  }, 0);
}

const s = "pwwkpew";
console.log(lengthOfLongestSubstring(s));
```

- 這題要做出 找出字串中 不重複 最長的 substring(子字串) 的函式, 考驗 對 substring 的觀念和應用

  - ps. String，Substring 與 Subsequence 差異

    - String - 字串，其中長度為 0 的字串也稱空字串

      Example : abcd

    - Substring - 子字串，字串(String)當中的一段字串

      Example : 字串 abcd 的子字串(Substring)有

      ---> 空、a、b、c、d、ab、bc、cd、abc、bcd、abcd

    - Subsequence - 子序列，字串(String)當中由左到右挑取字元所構成的字串

      Example : 字串 abcd 的子序列(Subsequence)有

      ---> 空、a、b、c、d、ab、ac、ad、bc、bd、cd、abc、abd、acd、bcd、abcd

- 因為 substring 的特性就是 子字串 字串當中的一段字串, 用 split 將字串變成一個 array, 就能利用子字串起始位置 array.key 數字去比較 子字串結尾字 array.key 來取得子字串長度.

  ```javascript
  console.log(s.split("")); // ['p', 'w', 'w', 'k', 'p' ,'e', 'w']
  ```

- 接著用 reduce() 跑迴圈 將 array 帶入裡面的 callback 函式, max = 0, v == array[key], i == array.index

  ```javascript
  reduce((max, v, i) => {...}, 0);
  ```

- 事先定義 left = 0, map = {}, left 代表 子字串 起始位置, map 儲存 array 的 value key 用來辨別是否重複 string 的功能, 接著看整個邏輯

  ```javascript
  left = map[v] >= left ? map[v] + 1 : left;
  map[v] = i;
  return Math.max(max, i - left + 1);
  ```

- left = if (map[v] >= left) 條件 true {left = map[v] + 1} ,false else {left = left};

  - left 紀錄子字串 起始位置 (map[v] = array.key)

  - 當 條件 (map[v] >= left) true 代表

    map[v] 這個 key 是存在的, 得到 value,

    (map[v] = left) 情況下, 代表下個 string 和 substring 的尾 相同 (一定相同 因為位置重疊),

    (map[v] > left) 情況下, 代表下個 string 和 substring 的尾 相同 (前後重疊),

    ps. pw wkpe 就是 符合上面狀況 所以 為了符合 longest substring without repeating characters 後者就被記錄 字元長度

    left = value, 更新 起始位置, + 1 是因為 left 從 0 開始算, 為了後續求子字串長度做準備.

  - 當 條件 (map[v] >= left) false 代表

    map[v] 這個 key 不存在 得到 undefind,

    map[v] < left 情況下, 代表 string 出現在 起始位置之前 可以忽略,

    left 子字串起始位置保持不變.

- map[v] = i;

  - 把 array 的 value 變成 map{} 的 key, array 的 key 變成 map{} 的 value, 為了記錄 不重複的 array.value

- return Math.max(max, i - left + 1);

  - Math.max() method 比較 新舊 子字串長度, 數字較大的賦值 max.

  - i - left + 1 可以得到 新的子字串的總長, i 代表 子字串的結尾字 index , left 代表 子字串的開頭字 index 兩者相減代表新子字串長度, + 1 是因為 i 從 0 開始算.

---

# 1920. Build Array from Permutation

- Given a zero-based permutation nums (0-indexed), build an array ans of the same length where ans[i] = nums[nums[i]] for each 0 <= i < nums.length and return it.

- A zero-based permutation nums is an array of distinct integers from 0 to nums.length - 1 (inclusive).

```javascript
Example 1:

Input: nums = [0,2,1,5,3,4]
Output: [0,1,2,4,5,3]
Explanation: The array ans is built as follows:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
    = [0,1,2,4,5,3]
Example 2:

Input: nums = [5,0,1,2,3,4]
Output: [4,5,0,1,2,3]
Explanation: The array ans is built as follows:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
    = [4,5,0,1,2,3]
```

```javascript
let nums = [5, 0, 1, 2, 3, 4];
var buildArray = function (nums) {
  return nums.map((a) => nums[a]);
};
console.log(buildArray(nums)); //[4,5,0,1,2,3]
```

- map array's value to callback function, nums[0] = param, buildArray[i] = nums[a]
- 利用 map 經過 callback function 回傳的值 會存在一個新的 array 變數 做到重新編排內容
- 原理: buildArray = [],
  buildArray[0] = nums[5], buildArray[1] = nums[0]
  buildArray[2] = nums[1], buildArray[3] = nums[2]
  buildArray[4] = nums[3], buildArray[5] = nums[4]
  buildArray = [4,5,0,1,2,3]

---

# 1929. Concatenation of Array

- Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

- Specifically, ans is the concatenation of two nums arrays.

- Return the array ans.

```javascript
Example 1:

Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]
Example 2:

Input: nums = [1,3,2,1]
Output: [1,3,2,1,1,3,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]


Constraints:

n == nums.length
1 <= n <= 1000
1 <= nums[i] <= 1000
```

```javascript
var getConcatenation = function (nums) {
  ans = [];
  for (i = 0; i < nums.length; i++) {
    ans[i] = nums[i];
    ans[nums.length + i] = nums[i];
  }
  return ans;
};
// [1,2,1,1,2,1]

var getConcatenation = function (nums) {
  //spread the nums array twice and return it
  return [...nums, ...nums];
};
// [1,2,1,1,2,1]
```

---

# isBeautifulString

- A string is said to be beautiful if each letter in the string appears at most as many times as the previous letter in the alphabet within the string; ie: b occurs no more times than a; c occurs no more times than b; etc. Note that letter a has no previous letter.

- Given a string, check whether it is beautiful.

- Example

  - For inputString = "bbbaacdafe", the output should be solution(inputString) = true.

    - This string contains 3 as, 3 bs, 1 c, 1 d, 1 e, and 1 f (and 0 of every other letter), so since there aren't any letters that appear more frequently than the previous letter, this string qualifies as beautiful.

  - For inputString = "aabbb", the output should be solution(inputString) = false.

    - Since there are more bs than as, this string is not beautiful.

  - For inputString = "bbc", the output should be solution(inputString) = false.

    - Although there are more bs than cs, this string is not beautiful because there are no as, so therefore there are more bs than as.

## Input/Output

- [execution time limit] 4 seconds (js)

- [input] string inputString

  - A string of lowercase English letters.

  - uaranteed constraints:
    - 3 ≤ inputString.length ≤ 50.

- [output] boolean

  - Return true if the string is beautiful, false otherwise.

```javascript
const isBeautifulString = (inputString) => {
  const alphabet = [];

  // "a".charCodeAt() // 97, "z"charCodeAt() // 122,
  // i = 97; i <= 122; i++
  // alphabet = a ~ z 的值
  for (let i = "a".charCodeAt(); i <= "z".charCodeAt(); i++) {
    alphabet.push(String.fromCharCode(i));
  }

  // letters 字母, Array(26) = 26 empty items, fill(0) 將 empty 填滿 0.
  const letters = Array(alphabet.length).fill(0);

  // console.log(letter); // [b, b, b, a, a, c, d, a, f, e]
  // alphabet.indexOf(letter) // 得 alphabet 的 index 數字, 去作為 letters[i] ++ 數字加一
  for (let letter of inputString) {
    letters[alphabet.indexOf(letter)]++;
  }

  // 比較 letters 前後的值, 只要有前一個 小於 後面的值就回傳 false, 都沒有的話 就回傳 true
  for (let i = 0; i < letters.length; i++) {
    if (letters[i + 1] > letters[i]) {
      return false;
    }
  }

  return true;
};

console.log(isBeautifulString("bbbaacdafe"));
```

---

# 考驗觀念 賦值的順序

```javascript
function calculate(arr, msg) {
  arr[1] = 150;
  msg = "inside";
  console.log(arr[0] + arr[1]);
  console.log(msg);
}

const arr = [100];
let msg = "outside";

// calculate(arr, msg); // 250, inside
// console.log(arr[0] + arr[1]); // 250, inside, 250
// console.log(msg); // 250 , inside, outside
```

# 考驗 function 觀念

```javascript
function sayHi(fullName, callback) {
  console.log(`Hi, ${fullName}!`);
  if (typeof callback === "function") {
    callback();
  }
}

function sayBye(fullName, callback) {
  console.log(`Bye, ${fullName}!`);
  callback();
}

function printMessage(firstName, lastName, callback) {
  const fullName = `${firstName} ${lastName}`;
  if (typeof callback === "function") {
    callback(fullName);
  }
}

printMessage("John", "Doe", (x) => console.log(x)); // John Doe
printMessage("Andrew", "Johnson", sayHi); // Hi, Andrew Johnson!
printMessage("Jane", "Ann", sayBye); // error callback is not a function
```

# 考驗 變數 被區隔的觀念 和 參數 觀念

```javascript
var bar = 5;
function foo(bar) {
  if (bar >= 5) {
    bar = "zzz";
  } else {
    let bar = "qux";
  }
  console.log(bar);
}

foo(2); // 2
foo(6); // zzz
console.log(bar); // 5
```

# 考驗 函數能不能被執行 和 變數的預設值

```javascript
printNum(150);
function printNum() {
  console.log(num);
  var num = 5;
}
```

# 考驗 prototype 的觀念, 去使用新設定的 method 賦值

```javascript
const Pair = function (first, second) {
  this.first = first;
  this.second = second;
};

Pair.prototype.setFirst = function (newFirst) {
  this.first = newFirst;
  return this;
};

Pair.prototype.setSecond = function (newSecond) {
  this.second = newSecond;
  return this;
};

const arr = [];
arr[0] = new Pair("first", "second");
// [ Pair { first: 'first', second: 'second' } ]
arr[1] = arr[0].setFirst("second");
//  Pair { first: 'second', second: 'second' },
//  Pair { first: 'second', second: 'second' }
arr[2] = arr[1].setSecond("first");
// [
//   Pair { first: 'second', second: 'first' },
//   Pair { first: 'second', second: 'first' },
//   Pair { first: 'second', second: 'first' }
// ]

if (arr[0] === arr[1] || arr[0] === arr[2] || arr[1] === arr[2]) {
  arr[0].setSecond("second").setFirst("first");
  // [
  //   Pair { first: 'first', second: 'second' },
  //   Pair { first: 'first', second: 'second' },
  //   Pair { first: 'first', second: 'second' }
  // ]
} else {
  arr[1].setFirst("third").setSecond("third");
}

// console.log(arr[0].first); // first
// console.log(arr[2].second); // second
```

# 考驗 物件 資料格式 和匿名函數 , 參數會向上尋找變數

```javascript
function math(operation, x) {
  const OPERATION = {
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };
  // console.log(OPERATION["*"](5));

  return function (y) {
    return OPERATION[operation](x, y);
  };
}
const mul = math("*", 5); // Function (anonymous)
// console.log(typeof mul); // function
// console.log(mul()); // NaN
console.log(mul("+", 2)(2)); //  TypeError:mul(...) is not a function

const add = math("+", mul(2)); // Function (anonymous)
// console.log(typeof add); // function
// console.log(add()); // NaN
console.log(add(math("-", 25)(20))); // 15
```

- 結論 有趣的是 從上 同樣的格式 不同的結果, 原因是 當資料被一層一層包起來後, 找不的參數會向外層 找, 所以 mul("+", 2)(2) 跳錯誤, math("-", 25)(20) 卻可以得到正確的答案

# 考驗 try {} catch (err) {}和 throw 的定義 對 程式運作的流程觀念

```javascript
function foo(a) {
  let returnValue = "";

  try {
    if (a === "bar") {
      console.log("1");
      throw new Error("qux");
    }
    console.log("2");
    returnValue = "try";
  } catch (err) {
    console.log(err);
    returnValue = "catch";
    console.log("3");
  } finally {
    returnValue = "finally";
    console.log("4");
  }

  return returnValue;
}

console.log(foo("bar")); // 3 4 finally
console.log(foo("zzz")); // 2 4 finally
```

# 考驗 setTimeout 的了解

```javascript
// 每隔 2.5秒 執行一次 console.log(arr00[i])
let arr00 = ["first", "second", "third", "fourth"];
for (var i = 0; i < 3; ++i) {
  setTimeout(() => {
    console.log(arr00[i]);
  }, 2500);
} // fourth fourth fourth

// 對照組 迴圈 執行 console.log(arr00[i])
for (var i = 0; i < 3; ++i) {
  console.log(arr00[i]);
} // first second third

setTimeout(() => {
  for (var i = 0; i < 3; ++i) {
    console.log(arr00[i]);
  }
}, 2500); // first second third
```

# 考驗 Promise 的觀念

```javascript
const prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("prom");
  }, 1000);
  setTimeout(() => {
    reject(new Error("!prom"));
  }, 5000);
});

prom
  .then(function (arg) {
    console.log(arg); // prom
    return new Promise((resolve, reject) => {
      reject(new Error("!arg"));
    }).catch((err) => {
      console.log(err.message); // !arg
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
```

- resolve() 是傳送成功的值, reject() 是傳送失敗的值,
- .then() 會去接成功的值, .catch() 會去接失敗的值

---

# 2011. Final Value of Variable After Performing Operations

- There is a programming language with only four operations and one variable X:

  - ++X and X++ increments the value of the variable X by 1.
  - --X and X-- decrements the value of the variable X by 1.
  - Initially, the value of X is 0.

- Given an array of strings operations containing a list of operations, return the final value of X after performing all the operations.

```javascript
Example 1:

Input: operations = ["--X","X++","X++"]
Output: 1
Explanation: The operations are performed as follows:
Initially, X = 0.
--X: X is decremented by 1, X =  0 - 1 = -1.
X++: X is incremented by 1, X = -1 + 1 =  0.
X++: X is incremented by 1, X =  0 + 1 =  1.
Example 2:

Input: operations = ["++X","++X","X++"]
Output: 3
Explanation: The operations are performed as follows:
Initially, X = 0.
++X: X is incremented by 1, X = 0 + 1 = 1.
++X: X is incremented by 1, X = 1 + 1 = 2.
X++: X is incremented by 1, X = 2 + 1 = 3.
Example 3:

Input: operations = ["X++","++X","--X","X--"]
Output: 0
Explanation: The operations are performed as follows:
Initially, X = 0.
X++: X is incremented by 1, X = 0 + 1 = 1.
++X: X is incremented by 1, X = 1 + 1 = 2.
--X: X is decremented by 1, X = 2 - 1 = 1.
X--: X is decremented by 1, X = 1 - 1 = 0.


Constraints:

1 <= operations.length <= 100
operations[i] will be either "++X", "X++", "--X", or "X--".
```

```javascript
function finalValueAfterOperations(operation) {
  let count = 0;
  for (i = 0; i < operation.length; i++) {
    if (operation[i] === "++X" || operation[i] === "X++") {
      count++;
    } else {
      count--;
    }
  }
  return count;
}

var finalValueAfterOperations = function (operations) {
  let result = 0;
  for (let i of operations) {
    if (i === "X++" || i === "++X") result++;
    else result--;
  }
  return result;
};

var finalValueAfterOperations = (operations) =>
  operations.reduce((acc, curr) => (curr[1] === "+" ? ++acc : --acc), 0);

var finalValueAfterOperations = function (operations) {
  return operations.reduce(function (acc, curr) {
    if (curr[1] === "+") {
      ++acc;
    } else {
      --acc;
    }
    return acc;
  }, 0);
};

console.log(finalValueAfterOperations(["--X", "X++", "X++"])); //1
```

---

# 2114. Maximum Number of Words Found in Sentences

- A sentence is a list of words that are separated by a single space with no leading or trailing spaces.

- You are given an array of strings sentences, where each sentences[i] represents a single sentence.

- Return the maximum number of words that appear in a single sentence.

```javascript
Example 1:

Input: sentences = ["alice and bob love leetcode", "i think so too", "this is great thanks very much"]
Output: 6
Explanation:
- The first sentence, "alice and bob love leetcode", has 5 words in total.
- The second sentence, "i think so too", has 4 words in total.
- The third sentence, "this is great thanks very much", has 6 words in total.
Thus, the maximum number of words in a single sentence comes from the third sentence, which has 6 words.
Example 2:

Input: sentences = ["please wait", "continue to fight", "continue to win"]
Output: 3
Explanation: It is possible that multiple sentences contain the same number of words.
In this example, the second and third sentences (underlined) have the same number of words.


Constraints:

1 <= sentences.length <= 100
1 <= sentences[i].length <= 100
sentences[i] consists only of lowercase English letters and ' ' only.
sentences[i] does not have leading or trailing spaces.
All the words in sentences[i] are separated by a single spac
```

```javascript
/**
 * @param {string[]} sentences
 * @return {number}
 */
var mostWordsFound = function (sentences) {
  let count = 0;
  for (i = 0; i < sentences.length; i++) {
    if (sentences[i].split(" ").length > count) {
      count = sentences[i].split(" ").length;
    }
  }
  return count;
};

var mostWordsFound = function (sentences) {
  let count = 0;
  for (let i of sentences) {
    if (i.split(" ").length > count) count = i.split(" ").length;
  }
  return count;
};

var mostWordsFound = function (sentences) {
  let max = 0;
  for (let sentence of sentences) {
    let words = sentence.split(" ");
    max = Math.max(max, words.length);
  }
  return max;
};

var mostWordsFound = function (sentences) {
  let max = 0;
  for (i = 0; i < sentences.length; i++) {
    let words = sentences[i].split(" ");
    max = Math.max(max, words.length);
  }
  return max;
};

var mostWordsFound = function (sentences) {
  return sentences.reduce((acc, el) => {
    return Math.max(acc, el.split(" ").length);
  }, 0);
};

var sentences = [
  "alice and bob love leetcode",
  "i think so too",
  "this is great thanks very much",
];
console.log(mostWordsFound(sentences)); // 6
```

---

1512. Number of Good Pairs

- Given an array of integers nums, return the number of good pairs.

- A pair (i, j) is called good if nums[i] == nums[j] and i < j.

```javascript
Example 1:

Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
Example 2:

Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.
Example 3:

Input: nums = [1,2,3]
Output: 0


Constraints:

1 <= nums.length <= 100
1 <= nums[i] <= 100
```

```javascript
// time O(N^2) space 0(1)
// 一個 for 迴圈 是 N, 兩個所以 N^2
// A pair (i, j), is called good if nums[i] == nums[j] and i < j.
// i 和 j 都是 index, 都是從 0 開始, 但條件必須 i < j, 所以迴圈 j+1
// 比對 nums[i] === nums[j] value 是相等的話, count +1, 最後回傳 count.
var numIdenticalPairs = function (nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }
  }
  return count;
};

// time O(N) space O(N)
// 下面的作法是 將 array 的 value 變成 {} 的 key, 初始值 = 1,
// 如果 map[number] 存在, count = map[number], map[number] += 1.
// 之所以可以 比對重複的 陣列的值, 可以從 (i, j) i < j, 符合條件的 (0,3)(0,4)(3,4)(2,5), 換算成的值 就是 三個 (1 === 1) 一個 (3 === 3), 共四個, 也可以發現 就是 值 和 值 在比 是否相同, 當有相同的時候, 就是一組囉
var numIdenticalPairs = function (nums) {
  const map = {};
  let count = 0;
  for (const number of nums) {
    if (map[number]) {
      count += map[number];
      map[number] += 1;
    } else {
      map[number] = 1;
    }
  }
  return count;
};
nums = [1, 2, 3, 1, 1, 3];
console.log(numIdenticalPairs(nums));
```

---

# 771. Jewels and Stones

- You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have.
- Each character in stones is a type of stone you have.
- You want to know how many of the stones you have are also jewels.

- Letters are case sensitive, so "a" is considered a different type of stone from "A".

```javascript
Example 1:

Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
Example 2:

Input: jewels = "z", stones = "ZZ"
Output: 0


Constraints:

1 <= jewels.length, stones.length <= 50
jewels and stones consist of only English letters.
All the characters of jewels are unique.
```

```javascript
var numJewelsInStones = function (jewels, stones) {
  var obj = {};
  var count = 0;
  for (let i = 0; i < jewels.length; i++) {
    obj[jewels[i]] = true;
  }
  console.log(obj);
  for (let i = 0; i < stones.length; i++) {
    if (obj[stones[i]]) {
      count++;
    }
  }
  return count;
};
```

- jewels 是 Set 儲存 j 的每一個值, s.plit("") 將 s 的值分開成 單一的 char,

  再用 jewels.has 去判斷 true or false, res 初始值是 0, 經過每次的迭代 ex.0 + true, res 就是答案了

  利用轉型別的 JS 特性, 1 + true = 2, 來做計算

```javascript
var numJewelsInStones = function (j, s) {
  const jewels = new Set(j);
  return s.split("").reduce((res, s) => res + jewels.has(s), 0);
};
```

```javascript
var numJewelsInStones = function (jewels, stones) {
  const REGEX = new RegExp(`[${jewels}]`, "g");
  return stones.match(REGEX) ? stones.match(REGEX).length : 0;
};

var numJewelsInStones = function (jewels, stones) {
  const REGEX = new RegExp(`[${jewels}]`, "g");
  console.log(`${jewels}`, `[${jewels}]`); // aA [aA]
  console.log(stones.match(REGEX)); // [ 'A', 'a', 'A' ]
  if (stones.match(REGEX)) {
    return stones.match(REGEX).length;
  } else {
    return 0;
  }
};
console.log(numJewelsInStones("aA", "AaAbbbb")); // 3
```

---

# 1365. How Many Numbers Are Smaller Than the Current Number

- Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it.
- That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].

- Return the answer in an array.

```javascript
Example 1:

Input: nums = [8,1,2,2,3]
Output: [4,0,1,1,3]
Explanation:
For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3).
For nums[1]=1 does not exist any smaller number than it.
For nums[2]=2 there exist one smaller number than it (1).
For nums[3]=2 there exist one smaller number than it (1).
For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).
Example 2:

Input: nums = [6,5,4,8]
Output: [2,1,0,3]
Example 3:

Input: nums = [7,7,7,7]
Output: [0,0,0,0]

Constraints:

2 <= nums.length <= 500
0 <= nums[i] <= 100
```

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {};
```

```javascript
var smallerNumbersThanCurrent = function (nums) {
  let numbers = Array(nums.length).fill(0);
  for (i = 0; i < nums.length; i++) {
    for (j = 0; j < nums.length; j++) {
      if (nums[i] > nums[j] && i != j) {
        numbers[i] += 1;
      }
    }
  }
  return numbers;
};

var smallerNumbersThanCurrent = function (nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  return nums.map((num) => sorted.indexOf(num));
};

var smallerNumbersThanCurrent = function (nums) {
  const sorted = [...nums].sort(function (a, b) {
    return a - b;
  });
  // console.log(sorted); // [ 1, 2, 2, 3, 8 ]
  return nums.map(function (num) {
    // console.log(sorted.indexOf(num)); // [ 4, 0, 1, 1, 3 ]
    return sorted.indexOf(num);
  });
};

var smallerNumbersThanCurrent = function (nums) {
  const sorted = Array.from(nums).sort((n1, n2) => n2 - n1);
  const map = new Map(
    sorted.map((num, index) => [num, nums.length - index - 1])
  );
  return nums.map((num) => map.get(num));
};

var smallerNumbersThanCurrent = function (nums) {
  const sorted = Array.from(nums).sort(function (n1, n2) {
    return n2 - n1;
  });
  // console.log(sorted); // [8, 3, 2, 2, 1]
  const map = new Map(
    sorted.map(function (num, index) {
      // console.log(num); // 8, 3, 2, 2, 1
      // console.log(nums.length); // 5
      // console.log(index); // 0, 1, 2, 3, 4
      // console.log([num, nums.length - index - 1]);
      return [num, nums.length - index - 1];
    })
  );
  console.log(map); // Map(4) { 8 => 4, 3 => 3, 2 => 1, 1 => 0 }
  return nums.map(function (num) {
    return map.get(num);
  });
};

console.log(smallerNumbersThanCurrent([8, 1, 2, 2, 3])); //[4,0,1,1,3]
```

---

# 1480. Running Sum of 1d Array

- Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).

- Return the running sum of nums.

```javascript
Example 1:

Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].
Example 2:

Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
Explanation: Running sum is obtained as follows: [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].
Example 3:

Input: nums = [3,1,2,10,1]
Output: [3,4,6,16,17]

Constraints:

1 <= nums.length <= 1000
-10^6 <= nums[i] <= 10^6
```

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  let result = [];
  for (i = 0; i < nums.length; i++) {
    if (i == 0) {
      result[i] = nums[i];
    } else {
      result[i] = nums[i] + result[i - 1];
    }
  }
  return result;
};

var runningSum = (nums) => {
  nums.reduce((a, c, i, arr) => (arr[i] += a));
  return nums;
};

var runningSum = function (nums) {
  nums.reduce(function (a, c, i, arr) {
    return (arr[i] += a);
  });
  return nums;
};

var runningSum = function (nums) {
  let runningTotal = 0;
  return nums.map((num) => (runningTotal += num));
};

var runningSum = function (nums) {
  let runningTotal = 0;
  return nums.map(function (num) {
    return (runningTotal += num);
  });
};
var runningSum = (nums) => {
  for (let i = 1; i < nums.length; ++i) {
    nums[i] += nums[i - 1];
  }
  return nums;
};
var runningSum = (nums) => {
  const LEN = nums.length;
  // console.log(LEN); // 4
  const ret = new Int32Array(LEN);
  // console.log(ret); // [0, 0, 0, 0]
  ret[0] = nums[0]; // 1
  for (let i = 1; i < LEN; ++i) {
    ret[i] = ret[i - 1] + nums[i];
  }
  return ret;
};
// console.log(runningSum([1, 2, 3, 4])); // [1,3,6,10]
```

---

1108. Defanging an IP Address

Given a valid (IPv4) IP address, return a defanged version of that IP address.

A defanged IP address replaces every period "." with "[.]".

```javascript
Example 1:

Input: address = "1.1.1.1"
Output: "1[.]1[.]1[.]1"
Example 2:

Input: address = "255.100.50.0"
Output: "255[.]100[.]50[.]0"

Constraints:
The given address is a valid IPv4 address.
```

```javascript
/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function (address) {
  return address.split(".").join("[.]");
};

var defangIPaddr = function (address) {
  return adderss.replace(/\./g, "[.]");
};

var defangIPaddr = function (address) {
  var result = "";
  for (var i = 0; i < address.length; i++) {
    if (address[i] === ".") result += "[.]";
    else result += address[i];
  }
  return result;
};

console.log(defangIPaddr("1.1.1.1"));
```

---

# 1528. Shuffle String

- You are given a string s and an integer array indices of the same length. The string s will be shuffled such that the character at the ith position moves to indices[i] in the shuffled string.

- Return the shuffled string.

```javascript
Example 1:

Input: s = "codeleet", indices = [4,5,6,7,0,2,1,3]
Output: "leetcode"
Explanation: As shown, "codeleet" becomes "leetcode" after shuffling.
Example 2:

Input: s = "abc", indices = [0,1,2]
Output: "abc"
Explanation: After shuffling, each character remains in its position.

Constraints:

s.length == indices.length == n
1 <= n <= 100
s consists of only lowercase English letters.
0 <= indices[i] < n
All values of indices are unique.
Accepted
188,915
Submissions
220,205
```

```javascript
var restoreString = function (s, indices) {
  var len = indices.length;
  var str = new Array(len);
  for (let i = 0; i < len; i++) {
    str[indices[i]] = s[i];
  }
  return str.join("");
};

var restoreString = function (s, indices) {
  const result = [];
  for (let i = 0; i < s.length; i++) {
    result[indices[i]] = s[i];
  }
  return result.join("");
};

console.log(restoreString("codeleet", [4, 5, 6, 7, 0, 2, 1, 3]));
```

# 1678. Goal Parser Interpretation

- You own a Goal Parser that can interpret a string command.
- The command consists of an alphabet of "G", "()" and/or "(al)" in some order.
- The Goal Parser will interpret "G" as the string "G", "()" as the string "o", and "(al)" as the string "al".
- The interpreted strings are then concatenated in the original order.

-Given the string command, return the Goal Parser's interpretation of command.

```javascript
Example 1:

Input: command = "G()(al)"
Output: "Goal"
Explanation: The Goal Parser interprets the command as follows:
G -> G
() -> o
(al) -> al
The final concatenated result is "Goal".
Example 2:

Input: command = "G()()()()(al)"
Output: "Gooooal"
Example 3:

Input: command = "(al)G(al)()()G"
Output: "alGalooG"


Constraints:

1 <= command.length <= 100
command consists of "G", "()", and/or "(al)" in some order.
Accepted
95,115
Submissions
111,179
```

```javascript
var interpret = function (command) {
  return command.split("()").join("o").split("(al)").join("al");
};
var interpret = function (command) {
  return command.replace(/\(\)/g, "o").replace(/\(al\)/g, "al");
};
var interpret = (command) =>
  command.replace(/\(al\)/g, "al").replace(/\(\)/g, "o");

var interpret = (command) => {
  const str = [];
  for (let i = 0; i < command.length; i++) {
    if (command.charAt(i) === "G") str.push("G");
    if (command.charAt(i) === "(") {
      if (command.charAt(i + 1) === ")") str.push("o");
      else {
        str.push("al");
      }
    }
  }
  console.log(str, command);
  return str.join("");
};

var interpret = (command) => {
  let str = "";
  for (let i = 0; i < command.length; i++) {
    if (command[i] === "G") str += "G";
    if (command[i] === "(") {
      if (command[i + 1] === ")") str += "o";
      else {
        str += "al";
      }
    }
  }
  return str;
};

var interpret = (command) => {
  return command.replace(/(\(\))|(\(al\))/g, (str) => {
    return str === "()" ? "o" : "al";
  });
};

var sstr = "G()(al)G";
// console.log(interpret(sstr));
```

---

# 2194. Cells in a Range on an Excel Sheet

- A cell (r, c) of an excel sheet is represented as a string "<col><row>" where:

- <col> denotes the column number c of the cell. It is represented by alphabetical letters.
- For example, the 1st column is denoted by 'A', the 2nd by 'B', the 3rd by 'C', and so on.
- <row> is the row number r of the cell. The rth row is represented by the integer r.
- You are given a string s in the format "<col1><row1>:<col2><row2>", where <col1> represents the column c1, <row1> represents the row r1, <col2> represents the column c2, and <row2> represents the row r2, such that r1 <= r2 and c1 <= c2.

- Return the list of cells (x, y) such that r1 <= x <= r2 and c1 <= y <= c2. The cells should be represented as strings in the format mentioned above and be sorted in non-decreasing order first by columns and then by rows.

```javascript
Example 1:


Input: s = "K1:L2"
Output: ["K1","K2","L1","L2"]
Explanation:
The above diagram shows the cells which should be present in the list.
The red arrows denote the order in which the cells should be presented.
Example 2:


Input: s = "A1:F1"
Output: ["A1","B1","C1","D1","E1","F1"]
Explanation:
The above diagram shows the cells which should be present in the list.
The red arrow denotes the order in which the cells should be presented.


Constraints:

s.length == 5
'A' <= s[0] <= s[3] <= 'Z'
'1' <= s[1] <= s[4] <= '9'
s consists of uppercase English letters, digits and ':'.
```

```javascript
var cellsInRange = function (s) {
  const [fromLetter, fromNum, , toLetter, toNum] = s;
  // console.log([fromLetter, fromNum, , toLetter, toNum]); // [ 'K', '1', <1 empty item>, 'L', '2' ]
  // console.log(s); // K1:L2
  const ret = [];
  for (
    let l1 = fromLetter.charCodeAt(0), l2 = toLetter.charCodeAt(0);
    l1 <= l2;
    ++l1
  ) {
    // console.log(l1); // 75 76
    for (let n1 = +fromNum, n2 = +toNum; n1 <= n2; ++n1) {
      // console.log(n1); // 1 2 1 2
      ret.push(String.fromCharCode(l1) + n1);
    }
  }
  return ret;
};

var cellsInRange = function (s) {
  var list = [];
  let c1 = s.charCodeAt(0), // 75
    c2 = s.charCodeAt(3), // 76
    r1 = s[1], // 1
    r2 = s[4]; // 2
  for (let c = c1; c <= c2; c++) {
    for (let r = r1; r <= r2; r++) {
      list.push(String.fromCharCode(c) + r);
    }
  }
  return list;
};

var toCharCode = (char) => char.charCodeAt();
var cellsInRange = function (s) {
  const result = [];
  for (let i = toCharCode(s[0]); i <= toCharCode(s[3]); i++) {
    for (let j = s[1]; j <= s[4]; j++) {
      result.push(String.fromCharCode(i) + j);
    }
  }
  return result;
};

var cellsInRange = function (s) {
  const strArr = s.split(":"); // ['K1', 'L2']

  const str1 = strArr[0][0]; // K
  const num1 = strArr[0][1]; // 1

  const str2 = strArr[1][0]; // L
  const num2 = strArr[1][1]; // 2

  let charCode1 = str1.charCodeAt(); // 75
  const charCode2 = str2.charCodeAt(); // 76

  const res = [];
  while (charCode1 <= charCode2) {
    let temp = num1;
    while (temp <= num2) {
      res.push(String.fromCharCode(charCode1) + temp);
      temp++;
    }
    charCode1++;
  }
  return res;
};

var cellsInRange = function (s) {
  const [firstCol, firstRow, _, secondCol, secondRow] = s; // [ 'K', '1', ':', 'L', '2' ]

  const addRows = (start, end, num) => {
    // console.log(start, end, num); // 1, 2, 75,  1, 2, 76
    const result = [];

    for (let index = start; index <= end; index++) {
      result.push(String.fromCharCode(num) + index);
    }

    return result; // ["K1", "K2", "L1", "L2"]
  };

  let total = [];

  for (
    let col = firstCol.charCodeAt(0);
    col <= secondCol.charCodeAt(0);
    col++
  ) {
    // console.log(col, firstCol, secondCol); // 75 K L
    // console.log(firstRow, secondCol, col);
    total = [...total, ...addRows(firstRow, secondRow, col)];
  }

  return total;
};

// console.log(cellsInRange("K1:L2")); // ["K1", "K2", "L1", "L2"]
```

---

# 1221. Split a String in Balanced Strings

- Balanced strings are those that have an equal quantity of 'L' and 'R' characters.

- Given a balanced string s, split it in the maximum amount of balanced strings.

- Return the maximum amount of split balanced strings.

```javascript
Example 1:

Input: s = "RLRRLLRLRL"
Output: 4
Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
Example 2:

Input: s = "RLLLLRRRLR"
Output: 3
Explanation: s can be split into "RL", "LLLRRR", "LR", each substring contains same number of 'L' and 'R'.
Example 3:

Input: s = "LLLLRRRR"
Output: 1
Explanation: s can be split into "LLLLRRRR".


Constraints:

1 <= s.length <= 1000
s[i] is either 'L' or 'R'.
s is a balanced string.
```

```javascript
var balancedStringSplit = function (s) {
  let matches = 0;
  let balance = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "R") {
      balance++;
    } else {
      balance--;
    }

    if (balance === 0) {
      matches++;
    }
  }
  return matches;
};

var balancedStringSplit = function (s) {
  let matches = 0;
  const stack = [];

  stack.push(s[0]); // R
  for (let i = 1; i < s.length; i++) {
    const top = stack[stack.length - 1]; // R

    // 預設值 undefined, top 的值 不同 s[i] 就刪掉 stack 一個值
    if (top !== undefined && top !== s[i]) {
      stack.pop(); // stack 少一個值
    } else {
      stack.push(s[i]); // stack 多一個值
    }

    // stack.length === 0 就是平衡
    if (stack.length === 0) {
      matches++;
    }
  }
  return matches;
};

var balancedStringSplit = function (s) {
  return countOfBalStr(s, 0);
};

function countOfBalStr(string, position, count = null, total = 0) {
  if (position >= string.length) {
    return total;
  }

  const letter = string[position];
  const value = letter === "L" ? 1 : -1;

  count += value;

  if (count === 0) {
    total++;
  }

  return countOfBalStr(string, position + 1, count, total);
}

console.log(balancedStringSplit("RLRRRLLRLL")); // 2 [Rl, RRRRLLLL]
```

---

# 1773. Count Items Matching a Rule

- You are given an array items, where each items[i] = [typei, colori, namei] describes the type, color, and name of the ith item.

  You are also given a rule represented by two strings, ruleKey and ruleValue.

- The ith item is said to match the rule if one of the following is true:

  - ruleKey == "type" and ruleValue == typei.
  - ruleKey == "color" and ruleValue == colori.
  - ruleKey == "name" and ruleValue == namei.
  - Return the number of items that match the given rule.

```javascript
Example 1:

Input: items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]], ruleKey = "color", ruleValue = "silver"
Output: 1
Explanation: There is only one item matching the given rule, which is ["computer","silver","lenovo"].
Example 2:

Input: items = [["phone","blue","pixel"],["computer","silver","phone"],["phone","gold","iphone"]], ruleKey = "type", ruleValue = "phone"
Output: 2
Explanation: There are only two items matching the given rule, which are ["phone","blue","pixel"] and ["phone","gold","iphone"]. Note that the item ["computer","silver","phone"] does not match.


Constraints:

1 <= items.length <= 104
1 <= typei.length, colori.length, namei.length, ruleValue.length <= 10
ruleKey is equal to either "type", "color", or "name".
All strings consist only of lowercase letters.
```
