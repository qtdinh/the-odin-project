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
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
    if (leftHalf[leftIndex] > rightHalf[rightIndex]) {
      sortedArray.push(rightHalf[rightIndex]);
      rightIndex++;
    } else {
      sortedArray.push(leftHalf[leftIndex]);
      leftIndex++;
    }
  }

  // previous loop does not check all cases, check if any remainders,
  // and append the rest to the end if that is the case
  while (leftIndex < leftHalf.length) {
    sortedArray.push(leftHalf[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < rightHalf.length) {
    sortedArray.push(rightHalf[rightIndex]);
    rightIndex++;
  }

  return sortedArray;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
