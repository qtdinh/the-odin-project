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
  // 3 2 1 13
  // [3 2] [1 13]
  rightHalf = mergeSort(rightHalf);
  // 8 5 0 1
  // [8 5] [0 1]

  // console.log("leftHalf", leftHalf);
  // console.log("rightHalf", rightHalf);
  // leftHalf (1) [3]
  // rightHalf (1) [2]
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

  while (leftHalf.length != 0) {
    sortedArray.push(leftHalf[0]);
    // console.log(sortedArray);
    leftHalf.shift();
  }

  while (rightHalf.length != 0) {
    sortedArray.push(rightHalf[0]);
    rightHalf.shift();
  }
  // compare values
  // halves need to come back together and compare again

  return sortedArray;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
