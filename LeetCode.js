// 1. Two Sum

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

// console.log(twoSum([2, 7, 11, 15], 18));

// 2. Add Two Numbers

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
  console.log(List);

  return List.next;
};

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

// console.log(addTwoNumbers(n1, m1));

// # 3. Longest Substring Without Repeating Characters

function lengthOfLongestSubstring(s) {
  const map = {};
  var left = 0;
  // console.log(s.split("")); // ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b']
  // max = accumulator, v = currentValue, i = currentIndex

  return s.split("").reduce((max, v, i) => {
    console.log(
      "time " +
        i +
        " left = " +
        left +
        " value = " +
        v +
        " map[v] = " +
        map[v] +
        " max = " +
        max
    );
    left = map[v] >= left ? map[v] + 1 : left;
    map[v] = i;
    // console.log("left = " + left);
    // console.log(map);
    // console.log("max = " + max);
    return Math.max(max, i - left + 1);
  }, 0);
}

const s = "pwwkpew";
// console.log(lengthOfLongestSubstring(s));

// # 1920. Build Array from Permutation

let nums = [5, 0, 1, 2, 3, 4];
var buildArray = function (nums) {
  return nums.map((a) => nums[a]);
};
// console.log(buildArray(nums)); //[4,5,0,1,2,3]

// # 1929. Concatenation of Array

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

function solution(inputString) {
  return inputString
    .split("")
    .sort()
    .join("")
    .replace(/([a-z])\1*/g, (it) => it.length + ",")
    .split(",")
    .slice(0, -1)
    .map(Number)
    .every(
      (el, i, ar) =>
        inputString.indexOf(String.fromCharCode(i + "a".charCodeAt(0))) >= 0 &&
        (i == 0 || ar[i] <= ar[i - 1])
    );
}

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
  console.log(letters);

  for (let i = 0; i < letters.length; i++) {
    if (letters[i + 1] > letters[i]) {
      return false;
    }
  }

  return true;
};

// console.log(isBeautifulString("bbbaacdafe"));

// 考驗觀念
{
  function calculate(arr, msg) {
    arr[1] = 150;
    msg = "inside";
    console.log(arr[0] + arr[1]);
    console.log(msg);
  }

  var arr = [100];
  let msg = "outside";
}
// calculate(arr, msg);
// console.log(arr[0] + arr[1]); // 250, inside, 250
// console.log(msg); // 250 , inside, outside

// 考驗 function 觀念
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

// printMessage("John", "Doe", (x) => console.log(x)); // John Doe
// printMessage("Andrew", "Johnson", sayHi); // Hi, Andrew Johnson!
// printMessage("Jane", "Ann", sayBye); // Bye, Jane Ann! callback is not a function

// 考驗 變數 被區隔的觀念 和 參數 觀念
var bar = 5;
function foo(bar) {
  if (bar >= 5) {
    bar = "zzz";
  } else {
    let bar = "qux";
  }
  console.log(bar);
}

// foo(2); // 2
// foo(6); // zzz
// console.log(bar); // 5

// 考驗 函數能不能被執行 和 變數的預設值
// printNum(150); // undefined
function printNum() {
  console.log(num);
  var num = 5;
}

// 考驗
const A = {
  elem: 5,
};

const B = {
  elem: 10,
  getElem(num) {
    return this.elem * num;
  },
};

const getElem = B.getElem;
const boundGetElem = getElem.bind(B);
// console.log(boundGetElem.apply(B, 10)); // non-objecjt
// console.log(boundGetElem(10)); // 100
// console.log(getElem.call(A, 10)); //50

// 考驗 prototype 的觀念, 去使用新設定的 method 賦值
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

var arr = [];
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

// 考驗 物件 資料格式 和匿名函數 , 參數會向上尋找變數
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
// console.log(mul("+", 2)(2)); //  TypeError:mul(...) is not a function

const add = math("+", mul(2)); // Function (anonymous)
// console.log(typeof add); // function
// console.log(add()); // NaN
// console.log(add(math("-", 25)(20))); // 15

// 結論 有趣的是 從上 同樣的格式 不同的結果, 原因是 當資料被一層一層包起來後, 找不的參數會向外層 找, 所以 mul("+", 2)(2) 跳錯誤, math("-", 25)(20) 卻可以得到正確的答案

// 考驗 try {} catch (err) {}和 throw 的定義 對 程式運作的流程觀念

function foo(a) {
  let returnValue = "";

  try {
    if (a === "bar") {
      console.log("1");
      throw new Error("qux"); // Error: qux
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

// console.log(foo("bar")); // 3 4 finally
// console.log(foo("zzz")); // 2 4 finally

// 考驗 setTimeout 的了解

// 每隔 2.5秒 執行一次 console.log(arr00[i])
// let arr00 = ["first", "second", "third", "fourth"];
// for (var i = 0; i < 3; ++i) {
//   setTimeout(() => {
//     console.log(arr00[i]);
//   }, 2500);
// } // fourth fourth fourth

// // 對照組 迴圈 執行 console.log(arr00[i])
// for (var i = 0; i < 3; ++i) {
//   console.log(arr00[i]);
// } // first second third

// setTimeout(() => {
//   for (var i = 0; i < 3; ++i) {
//     console.log(arr00[i]);
//   }
// }, 2500); // first second third

// 考驗 Promise 的觀念
// const prom = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("prom");
//   }, 1000);
//   setTimeout(() => {
//     reject(new Error("!prom"));
//   }, 5000);
// });

// prom
//   .then(function (arg) {
//     console.log(arg); // prom
//     return new Promise((resolve, reject) => {
//       reject(new Error("!arg"));
//     }).catch((err) => {
//       console.log(err.message); // !arg
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// - resolve() 是傳送成功的值, reject() 是傳送失敗的值,
// - .then() 會去接成功的值, .catch() 會去接失敗的值

// 2011. Final Value of Variable After Performing Operations

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

// console.log(finalValueAfterOperations(["--X", "X++", "X++"]));

// 2114. Maximum Number of Words Found in Sentences
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
// console.log(mostWordsFound(sentences)); // 6

// 1512. Number of Good Pairs
// time O(N^2) space 0(1)
var numIdenticalPairs = function (nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        console.log(
          "i= " + i + " nums[i]= " + nums[i],
          "j=" + j + " nums[j]= " + nums[j]
        );
        count++;
      }
    }
  }
  return count;
};
// time O(N) space O(N)
var numIdenticalPairs = function (nums) {
  const map = {};
  let count = 0;
  for (const number of nums) {
    if (map[number]) {
      count += map[number];
      map[number] += 1;
      // console.log(map);
    } else {
      map[number] = 1;
    }
  }
  return count;
};

var numIdenticalPairs = function (nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = nums.length - 1; j > i; j--) {
      if (nums[i] === nums[j]) count++;
    }
  }
  return count;
};

var numIdenticalPairs = function (nums) {
  const map = {};
  let count = 0;
  nums.forEach((num) => {
    if (map[num]) {
      count += map[num];
      map[num]++;
    } else {
      map[num] = 1;
    }
  });
  return count;
};

var numIdenticalPairs = function (nums) {
  nums.sort();
  let totalCount = 0;
  let curCount = 1;
  console.log(nums.sort());
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      totalCount += curCount;
      console.log("totalCount =" + totalCount);
      curCount++;
      console.log(curCount);
    } else {
      console.log("else");
      curCount = 1;
    }
  }
  return totalCount;
};

nums = [1, 2, 3, 1, 1, 3];
// console.log(numIdenticalPairs(nums));

// 771. Jewels and Stones
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
  var obj = {};
  var count = 0;
  for (let i = 0; i < jewels.length; i++) {
    obj[jewels[i]] = true;
  }
  console.log(obj); // {a: true, A: true}
  for (let i = 0; i < stones.length; i++) {
    if (obj[stones[i]]) {
      count++;
    }
  }
  return count;
};

// jewels 是 Set 儲存 j 的每一個值, s.plit("") 將 s 的值分開成 單一的 char, 再用 jewels.has 去判斷 true or false, res 初始值是 0, 經過每次的迭代 ex.0 + true, res 就是答案了
// 利用轉型別的 JS 特性, 1 + true = 2, 來做計算
var numJewelsInStones = function (j, s) {
  const jewels = new Set(j);
  return s.split("").reduce((res, s) => res + jewels.has(s), 0);
};

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
// console.log(numJewelsInStones("aA", "AaAbbbb")); // 3

// 1365. How Many Numbers Are Smaller Than the Current Number
/**
 * @param {number[]} nums
 * @return {number[]}
 */
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

// console.log(smallerNumbersThanCurrent([8, 1, 2, 2, 3])); //[4,0,1,1,3]

// 1480. Running Sum of 1d Array
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

// 1108. Defanging an IP Address
var defangIPaddr = function (address) {
  return address.split(".").join("[.]");
};

var defangIPaddr = function (address) {
  return address.replace(/\./g, "[.]");
};

var defangIPaddr = function (address) {
  var result = "";
  for (var i = 0; i < address.length; i++) {
    if (address[i] === ".") result += "[.]";
    else result += address[i];
  }
  return result;
};

// console.log(defangIPaddr("1.1.1.1"));

// # 1528. Shuffle String
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

// console.log(restoreString("codeleet", [4, 5, 6, 7, 0, 2, 1, 3]));

// 1678. Goal Parser Interpretation
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

// 2194. Cells in a Range on an Excel Sheet
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

// 1221. Split a String in Balanced Strings
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

// console.log(balancedStringSplit("RLRRRLLRLL")); // 2 [Rl, RRRRLLLL]

// 1773. Count Ltems Matching a Rule
var countMatches = function (items, ruleKey, ruleValue) {
  const result = [];
  if (ruleKey === "color") {
    for (i = 0; i < items.length; i++) {
      if (items[i][1] === ruleValue) {
        console.log(items[i]);
        result.push(items[i]);
      }
    }
  } else if (ruleKey === "type") {
    for (i = 0; i < items.length; i++) {
      if (items[i][0] === ruleValue) {
        result.push(items[i]);
      }
    }
  } else if (ruleKey === "name") {
    for (i = 0; i < items.length; i++) {
      if (items[i][2] === ruleValue) {
        result.push(items[i]);
      }
    }
  }
  return result.length;
};

const RULE_IDX = {
  type: 0,
  color: 1,
  name: 2,
};
var countMatches = function (items, ruleKey, ruleValue) {
  return items.reduce(function (ans, item) {
    if (item[RULE_IDX[ruleKey]] === ruleValue) {
      ans + 1;
    } else {
      ans;
    }
  }, 0);
};

var countMatches = function (items, ruleKey, ruleValue) {
  let id;
  if (ruleKey == "type") id = 0;
  else if (ruleKey == "color") id = 1;
  else id = 2;

  return items.filter(function (x) {
    return x[id] == ruleValue;
  }).length;
};

var items = [
  ["phone", "blue", "pixel"],
  ["computer", "silver", "lenovo"],
  ["phone", "gold", "iphone"],
];
console.log(countMatches(items, "color", "silver")); // 1
// console.log(items[0][1], items.length);
