/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

// No difference between the best, average and worst case: always O(n*log(n))
// Most JS engines use merge sort under the hood
// If you don't know what's coming in, merge sort is pretty performant 
// Skipping comparisons since -- you know that everything past the first element in the sorted array is larger, so you gain that extra info
// Spacial complexity is O(n), since it breaks down the original array into its separate elements -- this is relatively high
const mergeSort = (nums) => {
  if (!Array.isArray(nums)) return nums;

  const merge = (sortedA, sortedB) => {
    const mergeArr = [];
    while (sortedA.length && sortedB.length) {
      if (sortedA[0] < sortedB[0]) mergeArr.push(sortedA.shift());
      else mergeArr.push(sortedB.shift());
    }
    return [...mergeArr, ...sortedA, ...sortedB];
  }

  if (nums.length < 2) return nums;
  const splitIdx = Math.ceil(nums.length / 2);
  const A = nums.slice(0, splitIdx);
  const B = nums.slice(splitIdx, nums.length);
  return merge(mergeSort(A), mergeSort(B))
};

// unit tests
// do not modify the below code
test.skip("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
