/*

  Quick Sort!
  
  Name your function quickSort.
  
  Quick sort should grab a pivot from the end and then separate the list (not including the pivot)
  into two lists, smaller than the pivot and larger than the pivot. Call quickSort on both of those
  lists independently. Once those two lists come back sorted, concatenate the "left" (or smaller numbers)
  list, the pivot, and the "right" (or larger numbers) list and return that. The base case is when quickSort
  is called on a list with length less-than-or-equal-to 1. In the base case, just return the array given.

*/

// Worst case is sorted lists (as we are taking the pivot from the end) giving O(n**2) --> mitigate by choosing the pivot carefully; maybe taking the average of the list before hand
// The more shuffled the array is the better quickSort is
// Version that mutates the original array gives better spacial complexity O(log(n))
// Has the potential to have better spacial complexity than merge sort in the destructive case; And has better coefficients in the average case than mergeSort
// pivot selection is important -- look into quickSort 3 or other variants
function quickSort(nums) {
  if (!Array.isArray(nums)) return nums;

  if (nums.length < 2) return nums;
  const pivot = nums[nums.length - 1];
  const [A, B, C] = [[], [], []];
  for (n of nums) {
    if (n < pivot) A.push(n);
    else if (n === pivot) B.push(n);
    else C.push(n);
  }
  return [...quickSort(A), ...B, ...quickSort(C)];
}
function dQuickSort(nums, startIdx, pivotIdx, endIdx) {
  // destructive, space efficient version of quicksort
  if (!Array.isArray(nums)) return nums;
  startIdx = startIdx ?? 0;
  endIdx = endIdx ?? nums.length - 1;
  pivotIdx = pivotIdx ?? endIdx;

  if (endIdx - startIdx < 2) return nums;

  const pivot = nums[pivotIdx];
  let p = pivotIdx;
  for (let i = pivotIdx - 1; i >= startIdx; i--) {
    if (nums[i] > pivot) {
      // swaps to put element that it greater than the pivot just to the left of the pivot
      [nums[i], nums[p - 1]] = [nums[p - 1], nums[i]];
      [nums[p - 1], nums[pivotIdx]] = [nums[pivotIdx], nums[p - 1]];
    } else if (nums[i] === pivot) {
      p = p - 1;
      [nums[i], nums[p]] = [nums[p], nums[i]];
    };
  }
  dQuickSort(nums, startIdx, p - 1, p - 1); // further sort left side
  dQuickSort(nums, pivotIdx + 1, nums.length, nums.length); // further sort right side
  return nums;
}

// unit tests
// do not modify the below code
test.skip("quickSort", function () {
  const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
  const answer = quickSort(input);

  expect(answer).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test.skip("dQuickSort", function () {
  const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
  const answer = dQuickSort(input);

  expect(answer).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});