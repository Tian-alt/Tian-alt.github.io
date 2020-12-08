var lkwavestian = function () {

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
    if(val === false || val === null || val === 0 || val === "" || val === undefined || val !== val)
      return true
    else
      return false
  }
  function compact(ary) {
    var res = new Array
    for (let i = 0; i < ary.length; ++i) {
      if(!isFalse(ary[i]))
        res.push(ary[i])
    }
    return res
  }

  function drop(ary, num = 1) {
    var len = ary.length
    if(num >= len)
      return[]
    var res = []
    for(let i = num; i < len; ++i) {
      res.push(ary[i])
    }
    return res
  }
  function dropRight(ary, num = 1) {
    var len = ary.length
    if(num >= len)
      return[]
    var res = []
    for(let i = len - num - 1; i >= 0; --i) {
      res.unshift(ary[i])
    }
    return res
  }

  function join(ary, sep) {
    var res = ''
    for(let i = 0; i < ary.length; ++i) {
      if(i === ary.length - 1)
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
    for(let i = fromIdex; i >=0; --i) {
      if(ary[i] === val)
        return i
    }
    return -1
  }

  function fill(ary, val, start = 0, end = ary.length) {
    for(let i = start; i < end; ++i) {
      ary[i] = val
    }
    return ary
  }

  function findIndex(ary, predicate, fromIndex = 0) {
    for(let i = fromIndex; i < ary.length; ++i) {
      if(predicate(ary[i]))
        return i
    }
    return -1
  }

  function findLastIndex(ary, predicate, fromIndex = ary.length - 1) {
    for(let i = fromIndex; i >= 0; --i) {
      if(predicate(ary[i]))
        return i
    }
    return -1
  }
  return {
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
