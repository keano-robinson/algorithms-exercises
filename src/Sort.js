import React from "react";
import { shuffle, range } from "lodash";
import { App, snapshot, done, clear } from "./sort-visualizer";

import "./sort.css";

function sort(array) {
  // do cool stuff here
  const nums = array;
  snapshot(array);
  for (let currentIdx = 1 /*index of current unsorted value*/; currentIdx < nums.length; currentIdx++) {
    for (let pos = currentIdx - 1; pos >= 0; pos--) { // pos: positions in the sorted part of the array
      if (nums[currentIdx] > nums[pos]) break; // already in the correct position
      [nums[currentIdx], nums[pos]] = [nums[pos], nums[currentIdx]];
      snapshot(nums)
      currentIdx = pos;
    }
  }
  // call snapshot any time you do anything to the array
  // it's okay if you call it with duplicate value array,
  // it will deduplicate for you
  snapshot(array);
}

export default function SortComponent() {
  clear();
  sort(shuffle(range(50)));
  done();
  return <App />;
}
