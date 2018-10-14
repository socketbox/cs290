console.log("Activity 2");

let bar = "nonsense";

console.log("Invoking function foo().");
foo(bar)

console.log("Defining function foo().");
function foo( x )
{
  console.log("The type of your parameter is: ", typeof(x));
}

console.log("Calling function baz() assigned to var");
//throws error
func();

let func = function baz() {
   console.log("In baz.");
}

func();

//throws error
//baz();

