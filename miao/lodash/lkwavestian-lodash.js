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
  return {
    drop,
    compact,
    chunk,
  }
}()
