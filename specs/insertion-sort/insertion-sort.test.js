/*
  Insertion sort!
  
  Be sure to call your function insertionSort!
  
  The idea here is that the beginning of your list is sorted and the everything else is assumed to be an unsorted mess.
  The outer loop goes over the whole list, the index of which signifies where the "sorted" part of the list is. The inner
  loop goes over the sorted part of the list and inserts it into the correct position in the array.
  
  Like bubble sort, there's a visualization mechanism available to you. Just call snapshot(myArray) at the beginning of
  your inner loop and it should handle the rest for you!
  
  And you put xdescribe instead of describe if you want to suspend running the unit tests.  
*/

// Good for nearly sorted list -- this will only iterate over each element once with best case O(n) 
// Average/ worst case is O(n2)
// Any input that's expected to be mostly sorted and you need it to be totally sorted!!
// You can also combine sorts together for a more comprehensive solution, 
//- if insertion-sort runs for too many cycles (10 * length of the list, say) you can drop back to using quick sort or something else
//- this accommodates both average and worst case (don't want the rare worst case to break the system)
function insertionSort(nums) {
  for (let currentIdx = 1 /*index of current unsorted value*/; currentIdx < nums.length; currentIdx++) {
    for (let itemIdx = currentIdx - 1, comparatorIdx = currentIdx; itemIdx >= 0; itemIdx--) { // pos: positions in the sorted part of the array
      if (nums[comparatorIdx] > nums[itemIdx]) break; // already in the correct position
      [nums[comparatorIdx], nums[itemIdx]] = [nums[itemIdx], nums[comparatorIdx]];
      // could do one less swap on each iteration as in brian's solution
      comparatorIdx = itemIdx;
    }
  }
}

// unit tests
// do not modify the below code
test.skip("insertion sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  insertionSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
