function deepEqual(x, y)
{
    if( x == null && y == null)
        return true;
    if ((x == null && y != null) || (y == null && x != null))
        return false;
    else if (typeof(x) != typeof(y) )
        return false;
    else if (typeof(x) != 'object')
        return x === y;
    else
    {
        let keysX = Object.keys(x);
        let keysY = Object.keys(y);
        if(keysY.length == keysX.length)
        {
            for(let k in x)
            {
                if(deepEqual(x[k], y[k]))
                    return true;
            } 
        }
        else
        {
            return false;
        }
    }
}


/*function deepEqual(x, y)
{
    let flag = true;
    function deeper(x, y)
    { 
        let tX = typeof(x);
        let tY = typeof(y);
        if(tX != tY || (tX != 'object' && x !== y))
            flag = false; 
        else if(tX == tY)
        {
            if(tX == 'object' && x != null)
            {
                let xKeys = Object.keys(x);
                let yKeys = Object.keys(x);
                if(xKeys.length == yKeys.length)
                {
                    for(let k in x)
                    {
                        deeper(x[k], y[k]);
                    }
                }
            }
            else
            {
                if(flag)
                    flag = (x === y);
            }
        }
    }
    deeper(x, y);
    return flag;
}*/

let obj1 = 
{
      _id: 'Your Mom',
      index: '{{index()}}',
      guid: '{{guid()}}',
      isActive: '{{bool()}}',
      balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
      gender: { key1: "sucka", key2: "boy", key3: "GreenGoblin"},
      picture: 'http://placehold.it/32x32',
      age: '{{integer(20, 40)}}'
};
let obj2 =
{
      _id: 'Your Mom',
      index: '{{index()}}',
      guid: '{{guid()}}',
      isActive: '{{bool()}}',
      balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
      picture: 'http://placehold.it/32x32',
      gender: { key1: "sucka", key2: "boy", key3: "GreenGoblin"},
      age: '{{integer(20, 40)}}'
};
let obj3 = 
{
      picture: 'http://placehold.it/32x32',
      gender: { key1: "sucka", key2: "boy", key3: "GreenGoblin"},
      age: '{{integer(20, 40)}}'
};

let n1 = null;
let n2 = null;

let nan1 = NaN;
let nan2 = NaN;

console.log(deepEqual(obj1, obj2));
console.log(deepEqual(n1, n2));
console.log(deepEqual(n1, obj3));
console.log(deepEqual(nan1, nan2));
console.log(Date.now());

