function comparator(x,y)
{
  return (x > y);
}

function sortArr( comparator, arr )
{
  let notSorted = true;
  var tmp;
  //ugly bubble sort
  while(notSorted)
  {
    notSorted = false;
    for(let i=0; i < arr.length; i++)
    {
      //if first element is not greater than second
      if(arr.length > i+1 && !comparator(arr[i], arr[i+1]))
      {
        notSorted = true;
        tmp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = tmp;
      }
    }
  }
}

let arr = [55, 52, 78, 1, 23, 0, 88, 46, 17, 31, 93, 64];
    
sortArr(comparator, arr);

console.log(arr);
    
    
   