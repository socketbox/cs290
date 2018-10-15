function deepEqual(x, y)
{
    if (x == null &! y == null)
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
            let result = true;
            for(let k in x)
            {
                result = deepEqual(x[k], y[k]);
            } 
            return result;
        }
        else
        {
            return false;
        }
    }
}

//let x = "3";
//let y = 3;

let obj1 = 
{
      _id: 'Your Mom',
      index: '{{index()}}',
      guid: '{{guid()}}',
      isActive: '{{bool()}}',
      balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
      gender: { key1: "suck4", key2: "boy", key3: "GreenGoblin"},
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
{     eyeColor: '{{random("blue", "brown", "green")}}',
      name: '{{firstName()}} {{surname()}}',
      gender: { key1: "sucka", key2: "boy", key3: "GreenGoblin"},
      company: '{{company().toUpperCase()}}',
      email: '{{email()}}',
      phone: '+1 {{phone()}}',
};
/* 
      latitude: '{{floating(-90.000001, 90)}}',
      longitude: '{{floating(-180.000001, 180)}}',
      tags: [
        '{{repeat(7)}}',
        '{{lorem(1, "words")}}'
      ],
      friends: [
        '{{repeat(3)}}',
        {
          id: '{{index()}}',
          name: '{{firstName()}} {{surname()}}'
        }
      ],
      greeting: function (tags) {
        return 'Hello, ' + this.name + '! You have ' + tags.integer(1, 10) + ' unread messages.';
      },
      favoriteFruit: function (tags) {
        var fruits = ['apple', 'banana', 'strawberry'];
        return fruits[tags.integer(0, fruits.length - 1)];
      }
    }
 */

//console.log(deepEqual(x, y));
console.log(deepEqual(obj1, obj2));
//console.log(deepEqual(x, y));
