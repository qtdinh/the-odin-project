function mergeSort(array) {
  // base case: check if array is length 1
  if (array.length === 1) {
    return array;
  }

  // split array into halves
  let leftHalf = array.slice(0, Math.floor(array.length / 2));
  let rightHalf = array.slice(Math.floor(array.length / 2), array.length);

  // recursively split
  leftHalf = mergeSort(leftHalf);
  rightHalf = mergeSort(rightHalf);

  // compare the values and combine into a merged array
  let sortedArray = [];

  while (leftHalf.length != 0 && rightHalf.length != 0) {
    if (leftHalf[0] > rightHalf[0]) {
      sortedArray.push(rightHalf[0]);
      // console.log(sortedArray);
      rightHalf.shift();
    } else {
      sortedArray.push(leftHalf[0]);
      // console.log(sortedArray);
      leftHalf.shift();
    }
  }

  // previous loop does not check all cases, check if any remainders,
  // and append the rest to the end if that is the case
  if (leftHalf.length != 0) sortedArray = sortedArray.concat(leftHalf);

  if (rightHalf.length != 0) sortedArray = sortedArray.concat(rightHalf);

  return sortedArray;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
