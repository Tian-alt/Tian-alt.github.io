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
      if (!(prop in b) || !isEqual(a[prop], b[prop]))
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
    if (iteratee === null) {
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
    }
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
    var res = new Array
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

  return {
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
