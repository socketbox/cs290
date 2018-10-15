/*function findSolution(target) 
{
	function find(current, history) {
		if (current == target) {
			return history;
		}
		else if (current > target) {
			return null;
		}
		else {
			return find(current + 5, `(${history} + 5)`) ||
				find(current * 3, `(${history} * 3)`);
		}
	}
	return find(1, "1");
}

console.log(findSolution(24)); // → (((1 * 3) + 5) * 3)
*/
function find(target, history) 
{
	if (target == 1) 
	{
		return history;
	}
	else 
	{
		if(target % 3 == 0)// && ((target/3) <= s((target-5)))
			return find(target / 3, `(${history} / 3)`);	
		else if( target-5 >= 1)
			return find(target - 5, `(${history} - 5)`); 
		else
			return `Target not reachable; remainder of ${target}.`
		}
}

console.log(find(99, "99")); // → (((1 * 3) + 5) * 3)

