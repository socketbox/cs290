function buildList(list) 
{
    var result = [];
    var foo;
    for (var i = 0; i < list.length; i++) 
    {
        foo = function(x){ 
          var item = 'item' + list[i];
          return function(){ alert(item + ' ' + list[x]); }; 
        }(i); 
        
        result.push(foo);
    }
    return result;
}
 
function testList() 
{
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) 
    {
        fnlist[j]();
    }
}

testList();
