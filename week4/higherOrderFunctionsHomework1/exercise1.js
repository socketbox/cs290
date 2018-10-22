
function sumArray(arr)
{
  let count = 0;
  arr.forEach(foo);
  function foo(x)
  {
    count += x;
  }
  return count;
}

let array = [3,5,7];
console.log(sumArray(array));



