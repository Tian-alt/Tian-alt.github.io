var lkwavestian = function () {

  function isShallowEqual(a, b) {
    if (a === b) return true;

    if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
      return false;

    var propsInA = 0,
      propsInB = 0;

    for (var prop in b)
      propsInB += 1;

    for (var prop in a) {
      propsInA += 1;
      if (!(prop in b) || !isShallowEqual(a[prop], b[prop]))
        return false;
    }

    return propsInA <= propsInB;
  }

  function isEqual(a, b) {
    if (a === b)
      return true
    if (a == null || typeof a != "object" || b == null || typeof b != "object")
      return false
    var propsInA = 0,
      propsInB = 0
    for (var prop in a) {
      propsInA += 1
    }
    for (var prop in b) {
      propsInB += 1
      if (!(prop in a) || !isEqual(a[prop], b[prop]))
        return false
    }
    return propsInA == propsInB
  }

  function baseIteratee(iteratee) {
    /* if (iteratee === null) {
      return val => val;
    }
    if (typeof iteratee === "string") {
      return val => val[iteratee];
    }
    if (typeof iteratee === "function") {
      return iteratee;
    }
    if (iteratee instanceof Array) {
      return function (obj) {
        return obj[iteratee[0]] === iteratee[1];
      }
    } else if (typeof iteratee === "object") {
      if (Object.prototype.toString.call(iteratee) === "[object RegExp]")
        return val => iteratee.test(val);
      else
        return isShallowEqual.bind(null, iteratee);
    } */

    if (typeof iteratee === "string") {
      return property(iteratee)
    }
    if (iteratee instanceof Array) {
      return matchesProperty(iteratee[0], iteratee[1])
    }
    if (typeof iteratee === "object") {
      return matches(iteratee)
    }
    return iteratee
  }

  function chunk(ary, size) {
    var len = ary.length
    var num = Math.ceil(len / size)
    var result = new Array(num)
    var k = 0
    for (var i = 0; i < num; ++i) {
      result[i] = new Array
      for (var j = 0; j < size; ++j) {
        result[i].push(ary[k++])
        if (k == len)
          return result
      }
    }
    return result
  }

  function isFalse(val) {
    if (val === false || val === null || val === 0 || val === "" || val === undefined || val !== val)
      return true
    else
      return false
  }

  function compact(ary) {
    var res = new Array
    for (let i = 0; i < ary.length; ++i) {
      if (!isFalse(ary[i]))
        res.push(ary[i])
    }
    return res
  }

  function drop(ary, num = 1) {
    var len = ary.length
    if (num >= len)
      return []
    var res = []
    for (let i = num; i < len; ++i) {
      res.push(ary[i])
    }
    return res
  }

  function dropRight(ary, num = 1) {
    var len = ary.length
    if (num >= len)
      return []
    var res = []
    for (let i = len - num - 1; i >= 0; --i) {
      res.unshift(ary[i])
    }
    return res
  }

  function join(ary, sep) {
    var res = ''
    for (let i = 0; i < ary.length; ++i) {
      if (i === ary.length - 1)
        res += ary[i]
      else
        res = res + ary[i] + sep
    }
    return res
  }

  function last(ary) {
    return ary[ary.length - 1]
  }

  function lastIndexOf(ary, val, fromIdex = ary.length - 1) {
    for (let i = fromIdex; i >= 0; --i) {
      if (ary[i] === val)
        return i
    }
    return -1
  }

  function fill(ary, val, start = 0, end = ary.length) {
    for (let i = start; i < end; ++i) {
      ary[i] = val
    }
    return ary
  }

  function findIndex(arr, predicate, fromIdx = 0) {
    var iteratee = baseIteratee(predicate);
    for (let i = fromIdx; i < arr.length; i++) {
      if (iteratee(arr[i])) {
        return i;
      }
    }
    return -1;
  }

  function findLastIndex(ary, predicate, fromIndex = ary.length - 1) {
    var iteratee = baseIteratee(predicate);
    for (let i = fromIndex; i >= 0; --i) {
      if (iteratee(ary[i])) {
        return i;
      }
    }
    return -1;
  }

  /* function flatten(ary) {
    let res = new Array

    function
    for (let i = 0; i < ary.length; ++i) {
      if (ary[i] instanceof Array) {
        for (let j = 0; j < )
      }
    }
  } */

  function flattenDeep(ary) {
    var res = new Array()
    var recursion = ary => {
      for (let i = 0; i < ary.length; ++i) {
        if (!(ary[i] instanceof Array))
          res.push(ary[i])
        else
          recursion(ary[i])
      }
      return res
    }
    return recursion(ary)
  }

  function fromPairs(ary) {
    var map = {}
    for (let i = 0; i < ary.length; ++i) {
      map[ary[i][0]] = ary[i][1]
    }
    return map
  }

  function head(ary) {
    return ary[0]
  }

  function indexOf(ary, val, fromIndex = 0) {
    for (let i = fromIndex; i < ary.length; ++i) {
      if (ary[i] === val)
        return i
    }
    return -1
  }

  function initial(ary) {
    let res = []
    for (let i = 0; i < ary.length - 1; ++i) {
      res.push(ary[i])
    }
    return res
  }

  function reverse(ary) {
    var left = 0
    var right = ary.length - 1
    while (left < right) {
      let temp = ary[left]
      ary[left] = ary[right]
      ary[right] = temp
        ++left
        --right
    }
    return ary
  }

  function sortedIndex(ary, val) {
    var res = ary.length
    var left = 0
    var right = ary.length - 1
    while (left <= right) {
      let mid = (left + right) >> 1
      if (val <= ary[mid]) {
        res = mid
        right = mid - 1
      } else
        left = mid + 1
    }
    return res
  }

  function every(ary, predicate) {
    var iteratee = baseIteratee(predicate)
    for (let i = 0; i < ary.length; ++i) {
      if (!iteratee(ary[i], i, ary))
        return false
    }
    return true
  }

  function filter(ary, predicate) {
    var iteratee = baseIteratee(predicate)
    var res = []
    for (let i = 0; i < ary.length; ++i) {
      if (iteratee(ary[i], i, ary))
        res.push(ary[i])
    }
    return res
  }

  function find(ary, predicate) {
    var iteratee = baseIteratee(predicate)
    var res = undefined
    for (let i = 0; i < ary.length; ++i) {
      if (iteratee(ary[i], i, ary)) {
        res = ary[i]
        break
      }
    }
    return res
  }

  function toArray(val) {
    var res = []
    var i = 0
    for (var key in val) {
      res.push(val[key])
    }
    return res
  }

  function max(ary) {
    let max = ary[0]
    for (let i = 1; i < ary.length; ++i) {
      if (max < ary[i])
        max = ary[i]
    }
    return max
  }

  function maxBy(ary, iterate) {
    var iteratee = baseIteratee(iterate)
    var max = 0
    for (let i = 1; i < ary.length; ++i) {
      if (iteratee(ary[max]) < iteratee(ary[i]))
        max = i
    }
    return ary[max]
  }

  function min(ary) {
    let min = ary[0]
    for (let i = 1; i < ary.length; ++i) {
      if (min > ary[i])
        min = ary[i]
    }
    return min
  }

  function minBy(ary, iterate) {
    var iteratee = baseIteratee(iterate)
    var min = 0
    for (let i = 1; i < ary.length; ++i) {
      if (iteratee(ary[min]) > iteratee(ary[i]))
        min = i
    }
    return ary[min]
  }

  function sum(ary) {
    var sum = 0
    for (let i = 0; i < ary.length; ++i) {
      sum += ary[i]
    }
    return sum
  }

  function sumBy(ary, iterate) {
    var iteratee = baseIteratee(iterate)
    var sum = 0
    for (let i = 0; i < ary.length; ++i) {
      sum += iteratee(ary[i])
    }
    return sum
  }

  function difference(ary, ...values) {
    var res = []
    var map = new Map()
    for (let i = 0; i < values.length; ++i) {
      for (let j = 0; j < values[i].length; ++j)
        map.set(values[i][j], true)
    }
    for (let k = 0; k < ary.length; ++k) {
      if (!map.has(ary[k]))
        res.push(ary[k])
    }
    return res
  }

  function differenceBy(ary, ...values) {
    var res = []
    var map = new Map()
    var last = values[values.length - 1]
    if (typeof last === "function" || typeof last === "string") {
      var iteratee = baseIteratee(last);
      for (let i = 0; i < values.length - 1; ++i) {
        for (let j = 0; j < values[i].length; ++j)
          map.set(iteratee(values[i][j]), true)
      }
    } else {
      var iteratee = it => it
      for (let i = 0; i < values.length; ++i) {
        for (let j = 0; j < values[i].length; ++j)
          map.set(iteratee(values[i][j]), true)
      }
    }
    for (let j = 0; j < ary.length; ++j) {
      if (!map.has(iteratee(ary[j])))
        res.push(ary[j])
    }
    return res
  }

  function differenceWith(ary, values, iteratee) {
    var res = []
    for (let i = 0; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < values.length; ++j) {
        if (iteratee(ary[i], values[j])) {
          flag = true
          break
        }
      }
      if (!flag)
        res.push(ary[i])
    }
    return res
  }

  function dropRightWhile(ary, predicate) {
    let res = []
    let iteratee = baseIteratee(predicate)
    for (let i = ary.length - 1; i >= 0; --i) {
      if (!iteratee(ary[i])) {
        for (let j = i; j >= 0; --j)
          res.unshift(ary[j])
        return res
      }
    }
  }

  function dropWhile(ary, predicate) {
    let res = []
    let iteratee = baseIteratee(predicate)
    for (let i = 0; i < ary.length; ++i) {
      if (!iteratee(ary[i])) {
        for (let j = i; j < ary.length; ++j)
          res.push(ary[j])
        return res
      }
    }
  }

  function flatten(ary) {
    return [].concat(...ary)
  }

  function flattenDepth(ary, depth = 1) {
    let res = ary
    while (depth) {
      res = flatten(res)
        --depth
    }
    return res
  }

  function intersection(...arg) {
    let res = []
    let ary = flatten([...arg])
    ary.sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
    for (let i = 0; i < ary.length - 1; ++i) {
      if (ary[i] == ary[i + 1]) {
        res.push(ary[i])
        let j = i
        while (ary[j] == ary[j + 1] && j < ary.length - 1) {
          ++j
        }
        i = j
      }
    }
    return res
  }

  function intersectionBy(...arg) {
    let res = []
    let map = new Map()
    let ary = new Array(...arg)
    let iteratee = baseIteratee(ary.pop())
    for (let i = 0; i < ary.length; ++i) {
      for (let j = 0; j < ary[i].length; ++j) {
        let item = iteratee(ary[i][j])
        if (map.has(item))
          res.push(map.get(item))
        else
          map.set(item, ary[i][j])
      }
    }
    return res
  }

  function intersectionWith(...arg) {
    let res = []
    let par = new Array(...arg)
    let iteratee = baseIteratee(par.pop())
    let ary = par.shift()
    par = flatten(par)
    for (let i = 0; i < ary.length; ++i) {
      for (let j = 0; j < par.length; ++j) {
        if (iteratee(ary[i], par[j]))
          res.push(ary[i])
      }
    }
    return res
  }

  function nth(ary, n = 0) {
    let len = ary.length
    if (Math.abs(n) > len)
      return undefined
    let pos = (n + len) % len
    return ary[pos]
  }

  function pull(...arg) {
    let par = new Array(...arg)
    let ary = par.shift()
    let k = 0
    for (let i = 0; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < par.length; ++j) {
        if (ary[i] == par[j]) {
          flag = true
          break
        }
      }
      if (!flag)
        ary[k++] = ary[i]
    }
    ary.length = k
    return ary
  }

  function pullAll(...arg) {
    let par = new Array(...arg)
    let ary = par.shift()
    par = flatten(par)
    let k = 0
    for (let i = 0; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < par.length; ++j) {
        if (ary[i] == par[j]) {
          flag = true
          break
        }
      }
      if (!flag)
        ary[k++] = ary[i]
    }
    ary.length = k
    return ary
  }

  function pullAllBy(...arg) {
    let par = new Array(...arg)
    let ary = par.shift()
    let iteratee = baseIteratee(par.pop())
    par = flatten(par)
    let k = 0
    for (let i = 0; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < par.length; ++j) {
        if (iteratee(par[j]) == iteratee(ary[i])) {
          flag = true
          break
        }
      }
      if (!flag)
        ary[k++] = ary[i]
    }
    ary.length = k
    return ary
  }

  function pullAllWith(...arg) {
    let par = new Array(...arg)
    let ary = par.shift()
    let iteratee = baseIteratee(par.pop())
    par = flatten(par)
    let k = 0
    for (let i = 0; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < par.length; ++j) {
        if (iteratee(ary[i], par[j])) {
          flag = true
          break
        }
      }
      if (!flag)
        ary[k++] = ary[i]
    }
    ary.length = k
    return ary
  }

  function pullAt(ary, idx) {
    let res = []
    let map = new Map()
    for (let i = 0; i < idx.length; ++i) {
      map.set(idx[i], true)
      res.push(ary[idx[i]])
    }
    let k = 0
    for (let j = 0; j < ary.length; ++j) {
      if (!map.has(j))
        ary[k++] = ary[j]
    }
    ary.length = k
    return res
  }

  function tail(ary) {
    let first = ary.shift()
    return ary
  }

  function take(ary, n = 1) {
    let res = []
    if (n > ary.length)
      return ary
    if (n <= 0)
      return res
    for (let i = 0; i < ary.length; ++i) {
      res.push(ary[i])
        --n
      if (n <= 0)
        return res
    }
  }

  function takeRight(ary, n = 1) {
    let res = []
    if (n > ary.length)
      return ary
    if (n <= 0)
      return res
    for (let i = ary.length - 1; i >= 0; --i) {
      res.unshift(ary[i])
        --n
      if (n <= 0)
        return res
    }
  }

  function takeRightWhile(ary, predicate) {
    let res = []
    let iteratee = baseIteratee(predicate)
    for (let i = ary.length - 1; i >= 0; --i) {
      if (iteratee(ary[i]))
        res.unshift(ary[i])
      else
        return res
    }
  }

  function takeWhile(ary, predicate) {
    let res = []
    let iteratee = baseIteratee(predicate)
    for (let i = 0; i < ary.length; ++i) {
      if (iteratee(ary[i]))
        res.push(ary[i])
      else
        return res
    }
  }

  function sortedIndexBy(ary, val, predicate) {
    let iteratee = baseIteratee(predicate)
    var left = 0
    var right = ary.length - 1
    while (left <= right) {
      var mid = (left + right) >> 1
      if (iteratee(val) <= iteratee(ary[mid])) {
        right = mid - 1
      } else
        left = mid + 1
    }
    return mid
  }

  function sortedIndexOf(ary, val) {
    var left = 0
    var right = ary.length - 1
    while (left <= right) {
      var mid = (left + right) >> 1
      if (val > ary[mid]) {
        left = mid + 1
      } else
        right = mid - 1
    }
    if (ary[right + 1] == val)
      return right + 1
    else
      return -1
  }

  function sortedLastIndex(ary, val) {
    var left = 0
    var right = ary.length - 1
    while (left <= right) {
      var mid = (left + right) >> 1
      if (val < ary[mid]) {
        right = mid - 1
      } else
        left = mid + 1
    }
    if (ary[left - 1] == val)
      return left
    else
      return -1
  }

  function sortedLastIndexBy(ary, val, predicate) {
    let iteratee = baseIteratee(predicate)
    var left = 0
    var right = ary.length - 1
    while (left <= right) {
      var mid = (left + right) >> 1
      if (iteratee(val) < iteratee(ary[mid])) {
        right = mid - 1
      } else
        left = mid + 1
    }
    if (iteratee(ary[left - 1]) == iteratee(val))
      return left
    else
      return -1
  }

  function sortedLastIndexOf(ary, val) {
    var left = 0
    var right = ary.length - 1
    while (left <= right) {
      var mid = (left + right) >> 1
      if (val < ary[mid]) {
        right = mid - 1
      } else
        left = mid + 1
    }
    if (ary[right] == val)
      return right
    else
      return -1
  }

  function sortedUniq(ary) {
    let res = []
    for (let i = 0; i < ary.length; ++i) {
      res.push(ary[i])
      let j = i + 1
      for (j; j < ary.length; ++j) {
        if (ary[j] != ary[i])
          break
      }
      i = j - 1
    }
    return res
  }

  function sortedUniqBy(ary, predicate) {
    let iteratee = baseIteratee(predicate)
    let res = []
    for (let i = 0; i < ary.length; ++i) {
      res.push(ary[i])
      let j = i + 1
      for (j; j < ary.length; ++j) {
        if (iteratee(ary[j]) != iteratee(ary[i]))
          break
      }
      i = j - 1
    }
    return res
  }

  function union(...arg) {
    let map = new Map()
    let ary = flatten([...arg])
    for (let i = 0; i < ary.length; ++i) {
      if (!map.has(ary[i]))
        map.set(ary[i], ary[i])
    }

    let res = Array.from(map.keys())
    return res
  }

  function unionBy(...arg) {
    let ary = flatten([...arg])
    let iteratee = baseIteratee(ary.pop())
    let map = new Map()
    for (let i = 0; i < ary.length; ++i) {
      if (!map.has(iteratee(ary[i])))
        map.set(iteratee(ary[i]), ary[i])
    }
    let res = Array.from(map.values())
    return res
  }

  function unionWith(...arg) {
    let ary = flatten([...arg])
    let iteratee = baseIteratee(ary.pop())
    let res = [ary[0]]
    for (let i = 1; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < res.length; ++j) {
        if (iteratee(ary[i], res[j]))
          flag = true
      }
      if (!flag)
        res.push(ary[i])
    }
    return res
  }

  function uniq(ary) {
    let res = []
    let map = new Map()
    for (let i = 0; i < ary.length; ++i) {
      if (!map.has(ary[i])) {
        map.set(ary[i], true)
        res.push(ary[i])
      }
    }
    return res
  }

  function uniqBy(ary, predicate) {
    let res = []
    let map = new Map()
    let iteratee = baseIteratee(predicate)
    for (let i = 0; i < ary.length; ++i) {
      if (!map.has(iteratee(ary[i]))) {
        map.set(iteratee(ary[i]), true)
        res.push(ary[i])
      }
    }
    return res
  }

  function uniqWith(ary, predicate) {
    let iteratee = baseIteratee(predicate)
    let res = [ary[0]]
    for (let i = 1; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < res.length; ++j) {
        if (iteratee(ary[i], res[j]))
          flag = true
      }
      if (!flag)
        res.push(ary[i])
    }
    return res
  }

  function unzip(ary) {
    let len = ary.length
    let res = new Array(ary[0].length)
    for (let k = 0; k < res.length; ++k) {
      res[k] = new Array(len)
    }
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < ary[i].length; ++j) {
        res[j][i] = ary[i][j]
      }
    }
    return res
  }

  function unzipWith(ary, predicate) {
    let res = []
    let iteratee = baseIteratee(predicate)
    for (let i = 0; i < ary[0].length; ++i) {
      res.push(iteratee(ary[0][i], ary[1][i]))
    }
    return res
  }

  function add(a, b) {
    return a + b
  }

  function without(ary, ...arg) {
    let res = []
    let rmAry = new Array(...arg)
    for (let i = 0; i < ary.length; ++i) {
      let flag = false
      for (let j = 0; j < rmAry.length; ++j) {
        if (isEqual(ary[i], rmAry[j]))
          flag = true
      }
      if (!flag)
        res.push(ary[i])
    }
    return res
  }

  function xor(...arg) {
    let ary = new Array(...arg)
    ary = flatten(ary)
    let map = new Map()
    for (let i = 0; i < ary.length; ++i) {
      if (!map.has(ary[i]))
        map.set(ary[i], true)
      else
        map.set(ary[i], false)
    }
    let res = []
    map.forEach((val, key, map) => {
      if (val)
        res.push(key)
    })
    return res
  }

  function xorBy(...arg) {
    let ary = new Array(...arg)
    let iteratee = baseIteratee(ary.pop())
    ary = flatten(ary)
    let map = new Map()
    for (let i = 0; i < ary.length; ++i) {
      if (!map.has(iteratee(ary[i])))
        map.set(iteratee(ary[i]), ary[i])
      else
        map.delete(iteratee(ary[i]))
    }
    let res = Array.from(map.values())
    return res
  }

  function xorWith(...arg) {
    let ary = new Array(...arg)
    let iteratee = baseIteratee(ary.pop())
    ary = flatten(ary)
    let map = new Map()
    for (let i = 0; i < ary.length; ++i) {
      for (let j = i + 1; j < ary.length; ++j) {
        if (iteratee(ary[i], ary[j])) {
          map.set(i, true)
          map.set(j, true)
        }
      }
    }
    let res = []
    for (let j = 0; j < ary.length; ++j) {
      if (!map.has(j))
        res.push(ary[j])
    }
    return res
  }

  function zip(...ary) {
    let len = ary.length
    let res = new Array(ary[0].length)
    for (let k = 0; k < res.length; ++k) {
      res[k] = new Array(len)
    }
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < ary[i].length; ++j) {
        res[j][i] = ary[i][j]
      }
    }
    return res
  }

  function zipObject(props, values) {
    let res = {}
    for (let i = 0; i < props.length; ++i) {
      res[props[i]] = values[i]
    }
    return res
  }

  function zipWith(...arg) {
    let iteratee = baseIteratee(arg.pop())
    let res = new Array(arg[0].length)
    for (let i = 0; i < res.length; ++i) {
      res[i] = iteratee(arg[0][i], arg[1][i], arg[2][i])
    }
    return res
  }

  function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  function countBy(coll, iteratee) {
    var iteratee = baseIteratee(iteratee)
    let map = new Map()
    for (let i = 0; i < coll.length; ++i) {
      let key = iteratee(coll[i])
      if (map.has(key)) {
        let val = map.get(key)
        map.set(key, ++val)
      } else
        map.set(key, 1)
    }
    return strMapToObj(map)
  }

  function mapValues(obj, iteratee) {
    let res = {}
    var iteratee = baseIteratee(iteratee)
    for (let key in obj) {
      res[key] = iteratee(obj[key])
    }
    return res
  }

  function findLast(col, predicate, fromIndex = col.length - 1) {
    var iteratee = baseIteratee(predicate)
    for (let i = fromIndex; i >= 0; --i) {
      if (iteratee(col[i]))
        return col[i]
    }
  }

  function flatMap(col, predicate) {
    let res = []
    var iteratee = baseIteratee(predicate)
    Object.keys(col).forEach(i => {
      res = res.concat(iteratee(col[i]))
    });
    return res
  }

  function flatMapDeep(col, predicate) {
    let res = []
    var iteratee = baseIteratee(predicate)
    Object.keys(col).forEach(i => {
      res = res.concat(flattenDeep(iteratee(col[i])))
    });
    return res
  }

  function flatMapDepth(col, predicate, depth) {
    let res = []
    var iteratee = baseIteratee(predicate)
    Object.keys(col).forEach(i => {
      res = res.concat(flattenDepth(iteratee(col[i]), depth - 1))
    });
    return res
  }

  function forEach(col, iteratee) {
    let keys = Object.keys(col)
    for (let i = 0; i < keys.length; ++i) {
      if (iteratee(col[keys[i]], keys[i], col))
        iteratee(col[keys[i]], keys[i], col)
    }
    return col
  }

  function forEachRight(col, iteratee) {
    let keys = Object.keys(col)
    for (let i = keys.length - 1; i >= 0; --i) {
      if (iteratee(col[keys[i]], keys[i], col))
        iteratee(col[keys[i]], keys[i], col)
    }
    return col
  }

  function groupBy(col, predicate) {
    let iteratee = baseIteratee(predicate)
    let res = {}
    for (let i of Object.keys(col)) {
      let key = iteratee(col[i])
      if (res[key])
        res[key].push(col[i])
      else
        res[key] = [col[i]]
    }
    return res
  }

  function isMatch(object, source) {
    if (object === source) return true

    if (object == null || typeof object != "object" ||
      source == null || typeof source != "object")
      return false;

    var propsInA = 0,
      propsInB = 0;

    for (var prop in object)
      propsInA += 1;

    for (var prop in source) {
      propsInB += 1;
      if (!(prop in object) || !isMatch(object[prop], source[prop]))
        return false;
    }

    return propsInB <= propsInA;
  }

  function toPath(val) {
    return val.split(/\.|\[|\]\.|\]\[/g);
  }

  function get(obj, path, defaultVal) {
    if (typeof path == 'string') {
      path = toPath(path);
    }
    for (let i = 0; i < path.length; i++) {
      if (obj == undefined) {
        return defaultVal;
      }
      obj = obj[path[i]];
    }
    if (obj == undefined) {
      return defaultVal;
    }
    return obj;
  }

  function property(path) {
    return bind(get, null, window, path)
  }


  function matches(src) {
    return bind(isMatch, null, window, src)
  }

  function bind(f, thisArg, ...partials) {
    return function (...args) {
      var copy = partials.slice()
      /* copy.forEach(item => {
        if(item === window)
          item = args.shift() ???? forEach对window判别不了相等情况？？
      }) */
      for (var i = 0; i < copy.length; ++i) {
        if (copy[i] === window)
          copy[i] = args.shift()
      }
      return f.call(thisArg, ...copy, ...args)
    }
  }
  //  function f(a,b,c,d) {return a + b + c + d}
  //  f1 = bind(f, null, window, b = 2, window, d = 3)
  //  f1(a,c)

  function matchesProperty(path, srcValue) {
    return function (obj) {
      return isEqual(get(obj, path), srcValue);
    }
  }

  function includes(col, val, fromIndex = 0) {
    if (typeof col === "string") {
      return col.includes(val, fromIndex);
    } else {
      let ary = Object.values(col)
      if (fromIndex < 0) {
        for (let i = ary.length - 1; i >= 0; --i) {
          if (isEqual(ary[i], val))
            return true
        }
      } else {
        for (let i = fromIndex; i < ary.length; ++i) {
          if (isEqual(ary[i], val))
            return true
        }
      }
    }
    return false;
  }

  function invokeMap(collection, path, ...args) {
    let vals = Object.values(collection);
    return vals.map(obj => {
      if (!isFunction(path)) {
        path = get(obj, path);
      }
      return path.call(obj, ...args)
    })
  }

  function identity(val) {
    return val
  }

  function keyBy(col, iteratee) {
    var iteratee = baseIteratee(iteratee)
    let res = {}
    let ary = Object.values(col)
    for (let i = 0; i < ary.length; ++i) {
      let key = iteratee(ary[i])
      res[key] = ary[i]
    }
    return res
  }

  function map(col, iteratee) {
    var iteratee = baseIteratee(iteratee)
    let res = []
    let ary = Object.values(col)
    for (let i = 0; i < ary.length; ++i) {
      res.push(iteratee(ary[i], i, col))
    }
    return res
  }

  function sortBy(col, ...args) {
    let iterates = args.map(it => baseIteratee(it)) //比较函数映射
    let ary = []
    for (let i in col) {
      ary.push(Object.values(col[i])) //数组集
    }
  }

  function baseSort(arr, idx) {
    let map = new Map()
    let valToSort = new Array(arr.length)
    arr.forEach(item => {
      let val = item[idx]
      map.set(val, item)
      arrToSort.push(val)
    });
    let valHadSort = valToSort.sort()
    let res = []
    valHadSort.forEach(val => {
      res.push(map.get(val))
    });
    return res
  }

  function partition(col, predicate) {
    let res = new Array(2)
    res[0] = []
    res[1] = []
    let iteratee = baseIteratee(predicate)
    for (var item of Object.values(col)) {
      if (iteratee(item))
        res[0].push(item)
      else
        res[1].push(item)
    }
    return res
  }

  function reduce(col, iteratee, acc) {
    iteratee = baseIteratee(iteratee)
    for (var key in col) {
      if (acc === undefined) {
        acc = col[key]
        continue
      }
      acc = iteratee(acc, col[key], key, col)
    }
    return acc
  }

  function reduceRight(col, iteratee, acc) {
    iteratee = baseIteratee(iteratee)
    let keys = Object.keys(col)
    for (let i = keys.length - 1; i >= 0; --i) {
      if (acc === undefined) {
        acc = keys[i]
        continue
      }
      acc = iteratee(acc, col[keys[i]], keys[i], col)
    }
    return acc
  }

  function reject(col, predicate) {
    let res = []
    let iteratee = baseIteratee(predicate)

    for (var item of col) {
      if (!iteratee(item))
        res.push(item)
    }
    return res
  }

  function sample(col) {
    let keys = Object.keys(col)
    return col[keys[random(0, keys.length)]]
  }


  function random(lower = 0, upper = 1, floating) {
    let isFloating = false

    if (arguments.length == 1) {
      upper = lower
      lower = 0
      if (!isInteger(arguments[0])) {
        isFloating = true
      }
    }

    if (arguments.length == 2) {
      if (typeof arguments[1] == 'boolean') {
        upper = lower
        lower = 0
        isFloating = floating
      }
      if (!isInteger(arguments[0]) || !isInteger(arguments[1])) {
        isFloating = true
      }
    }

    if (isFloating)
      return Math.random() * (upper - lower) + lower
    else {
      lower = Math.ceil(lower)
      upper = Math.ceil(upper)
      return Math.floor(Math.random() * (upper - lower) + lower)
    }
  }

  function isInteger(val) {
    return Number.isInteger(val)
  }

  function sampleSize(col, n = 1) {
    let res = []
    let keys = Object.keys(col)
    for (let i = 0; i < n; ++i) {
      res.push(col[[keys[random(0, keys.length)]]])
    }
    return res
  }

  function shuffle(col) {
    let keys = Object.keys(col)
    // 本质其实是选择排序，从后往前
    for (var i = keys.length - 1; i >= 0; i--) { //从后往前扫描
      var randomIndex = Math.floor(Math.random() * (i + 1)); //从0 到 i (都包括) 随机选择一个数字
      var itemAtIndex = col[keys[randomIndex]]; //交换下标为 i 与下标为随机位置的元素
      col[keys[randomIndex]] = col[keys[i]];
      col[keys[i]] = itemAtIndex;
    }
    return col;
  }

  function size(col) {
    return Object.keys(col).length
  }

  function some(col, predicate) {
    let iteratee = baseIteratee(predicate)
    for (var item of col) {
      if (iteratee(item))
        return true
    }
    return false
  }

  function defer(f, ...args) {
    return setTimeout(f(...args), 0)
  }

  function delay(f, wait, ...args) {
    return setTimeout(f(...args), wait)
  }

  function castArray(value) {
    return [value]
  }

  function conformsTo(object, source) {
    for (let key in object) {
      if (source.hasOwnProperty(key)) {
        let iteratee = baseIteratee(source[key])
        if (!iteratee(object[key]))
          return false
      }
    }
    return true
  }

  function eq(value, other) {
    return value === other || Number.isNaN(value) && Number.isNaN(other)
  }

  function gt(value, other) {
    return value > other
  }

  function gte(value, other) {
    return value >= other
  }

  function isArguments(values) {
    let type = Object.prototype.toString.call(values)
    return isEqual(type, "[object Arguments]")
  }

  function isArray(values) {
    return Array.isArray(values)
  }

  function isArrayBuffer(values) {
    let type = Object.prototype.toString.call(values)
    return isEqual(type, "[object ArrayBuffer]")
  }

  function isArrayLike(value) {
    if (value === null)
      return false
    if (typeof value == 'function') {
      return false
    }
    return value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER
  }

  function isArrayLikeObject(value) {
    if (typeof value == 'function') {
      return false
    }
    return typeof value === 'object' && value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER
  }

  function isBoolean(value) {
    let type = Object.prototype.toString.call(value)
    return isEqual(type, "[object Boolean]")
  }

  function isDate(value) {
    let type = Object.prototype.toString.call(value)
    return isEqual(type, "[object Date]")
  }

  function isEmpty(value) {
    if (isArrayLike(value))
      return value.length === 0
    if (typeof value === 'object') {
      for (let key in value) {
        return false
      }
    }
    return true
  }

  return {
    isEmpty,
    isDate,
    isBoolean,
    isArrayLikeObject,
    isArrayLike,
    isArrayBuffer,
    isArray,
    isArguments,
    gte,
    gt,
    eq,
    conformsTo,
    castArray,
    delay,
    defer,
    some,
    size,
    shuffle,
    sampleSize,
    isInteger,
    sample,
    random,
    reject,
    reduceRight,
    reduce,
    partition,
    map,
    keyBy,
    identity,
    includes,
    matchesProperty,
    bind,
    matches,
    property,
    get,
    toPath,
    isMatch,
    groupBy,
    forEachRight,
    forEach,
    flatMapDepth,
    flatMapDeep,
    flatMap,
    findLast,
    mapValues,
    countBy,
    zipWith,
    zipObject,
    zip,
    xorWith,
    xorBy,
    xor,
    without,
    add,
    unzipWith,
    unzip,
    uniqWith,
    uniqBy,
    uniq,
    unionWith,
    unionBy,
    union,
    sortedUniqBy,
    sortedUniq,
    sortedLastIndexOf,
    sortedLastIndexBy,
    sortedLastIndex,
    sortedIndexOf,
    sortedIndexBy,
    takeWhile,
    takeRightWhile,
    takeRight,
    take,
    tail,
    pullAt,
    pullAllWith,
    pullAllBy,
    pullAll,
    pull,
    nth,
    intersectionWith,
    intersectionBy,
    intersection,
    flattenDepth,
    flatten,
    dropWhile,
    dropRightWhile,
    differenceWith,
    isEqual,
    differenceBy,
    difference,
    sumBy,
    sum,
    minBy,
    min,
    maxBy,
    max,
    toArray,
    find,
    filter,
    every,
    sortedIndex,
    reverse,
    initial,
    indexOf,
    head,
    fromPairs,
    flattenDeep,
    findLastIndex,
    findIndex,
    fill,
    lastIndexOf,
    last,
    join,
    dropRight,
    drop,
    compact,
    chunk,
  }
}()
