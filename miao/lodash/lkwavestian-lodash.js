var lkwavestian = function() {

  function chunk(ary, size) {
    var len = ary.length
    var num = Math.ceil(len / size)
    var result = new Array(num)
    var k = 0
    for (var i = 0; i < num; ++i) {
      result[i] = new Array
      for (var j = 0; j < size; ++j) {
        result[i].push(ary[k++])
        if(k == len)
          return result
      }
    }
    return result
  }

  function compact()
  return {
    chunk,
  }
}()
