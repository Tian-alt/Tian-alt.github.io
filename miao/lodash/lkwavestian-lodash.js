var lkwavestian = function() {

  function chunk(ary, size) {
    let len = ary.length
    let num = Math.ceil(len / size)
    let result = new Array(num)
    let k = 0
    for (let i = 0; i < num; ++i) {
      result[i] = new Array
      for (let j = 0; j < size; ++j) {
        result[i].push(ary[k++])
        if(k == len)
          return result
      }
    }
    return result
  }
  
  return {
    chunk,
  }
}()
