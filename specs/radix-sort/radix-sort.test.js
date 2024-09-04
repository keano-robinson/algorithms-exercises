/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

// Time complexity: O(n * k) where k is the length of the longest digit; we ar looping over each number (n) k times (as much as the longest digit requires) and assigning them to buckets (constant time)
// Space complexity: O(n + k) --> must create buckets
// Never directly compares numbers
function getLengthOfLongestNum(numArray) {
	return numArray.reduce((lengthOfLongestNum, num) => {
		const l = num.toString().length;
		if (l > lengthOfLongestNum) return l;
		return lengthOfLongestNum;
	}, 0);
}
function getDigit(number, place) {
	const s = number.toString();
	return place > s.length ? 0 : +s.charAt(s.length - place);
}
// An alternate version of getDigit that uses only arithmetic operations
function gd(number, place) {
	let d = 1;
	for (let p = 0; p < place; p++) {
		number -= number % d;
		d *= 10;
	}
	return Math.floor((number % d) * (10 / d));
}
function radixSort(array) {
	const k = getLengthOfLongestNum(array);
	const buckets = Array(10)
		.fill(null)
		.map(() => new Array()); // base 10 radix sort

	for (let p = 1; p <= k; p++) {
		// n * k time complexity
		while (array.length) {
			const n = array.shift();
			buckets[getDigit(n, p)].push(n);
		}
		for (const bucket of buckets) {
			while (bucket.length) {
				array.push(bucket.shift());
			}
		}
	}
	return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
	it("should sort correctly", () => {
		const nums = [
			20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
			3000, 3001, 1200, 633,
		];
		const ans = radixSort(nums);
		expect(ans).toEqual([
			1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
			1200, 1244, 3000, 3001,
		]);
	});
	it("should sort 99 random numbers correctly", () => {
		const fill = 99;
		const nums = new Array(fill)
			.fill()
			.map(() => Math.floor(Math.random() * 500000));
		const ans = radixSort(nums);
		expect(ans).toEqual(nums.sort());
	});
});
