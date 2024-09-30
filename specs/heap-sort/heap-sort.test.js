/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap

*/

// O(n log(n)) time complexity with O(1) space complexity
const heapSort = (array) => {
	createMaxHeap(array);
	for (let i = 0; i < array.length - 1; i++) {
		[array[0], array[array.length - 1 - i]] = [
			array[array.length - 1 - i],
			array[0],
		];
		heapify(array, 0, array.length - i - 1);
	}
	return array;
};

const createMaxHeap = (array) => {
	for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
		heapify(array, i, array.length);
	}
};

const heapify = (array, index, heapSize) => {
	const leftIndex = 2 * index + 1 < heapSize ? 2 * index + 1 : null;
	const rightIndex =
		leftIndex && leftIndex + 1 < heapSize ? leftIndex + 1 : null;
	if (!(leftIndex || rightIndex)) return;

	const maxChildIndex =
		leftIndex && rightIndex
			? array[rightIndex] > array[leftIndex]
				? rightIndex
				: leftIndex
			: (leftIndex ?? rightIndex);

	if (array[index] < array[maxChildIndex]) {
		[array[index], array[maxChildIndex]] = [array[maxChildIndex], array[index]];
		heapify(array, maxChildIndex, heapSize);
	}
};

// unit tests
// do not modify the below code
test.skip("heap sort", function () {
	const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
	heapSort(nums);
	expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
