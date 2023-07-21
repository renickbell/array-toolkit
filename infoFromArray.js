// --------------------------------------------------------------------------
// -- infoFromArray.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//Find the closest number that is smaller than it:
function findClosestSmaller(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let closest = null;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < num) {
      closest = arr[mid];
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return closest;
}

//Find most frequent item that appears in array: change to find most frequen item
function findMostFrequentItem(array) {
  var itemCounts = new Map();
  var maxItem = array[0];
  var maxCount = 0;
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (itemCounts.has(item)) {
      itemCounts.set(item, itemCounts.get(item) + 1);
    } else {
      itemCounts.set(item, 1);
    }
    var currentCount = itemCounts.get(item);
    if (currentCount > maxCount) {
      maxItem = item;
      maxCount = currentCount;
    }
  }
  return maxItem;
}

function sum (inputArray) {
    return inputArray.reduce((acc,cur) => {return acc + cur},0)
}

function runningSum (startingVal,inputArray) {
    let currentSum = startingVal;
    let output = [];
    for (let i = 0; i < inputArray.length; i++) {
        let newSum = inputArray[i] + currentSum;
        output.push(newSum);
        currentSum = newSum;
    }
    return output
}

function mean (inputArray) {
      return sum(inputArray)/inputArray.length
}

function includesOneOf (inputArray, things) {
    let bools = things.map(t => inputArray.includes(t));
    if (bools.includes(true)) {return true} else {return false}
}

function matchesOneOf (candidates, thing) {
    return includesOneOf([thing],candidates)
}

function getMinIndex (inputArray) {
    let currentMin = [];
    for (let i = 0; i< inputArray.length; i++){
        if (currentMin[0] == undefined) {currentMin[0] = [0,inputArray[i]]}
        else if (inputArray[i] < currentMin[0][1]) {currentMin = [[i,inputArray[i]]]}
        else if (inputArray[i] == currentMin[0][1]) {currentMin.push([i,inputArray[i]])}
    }
    return currentMin
}

function getMaxIndex (inputArray) {
    let currentMax = [];
    for (let i = 0; i< inputArray.length; i++){
        if (currentMax[0] == undefined) {currentMax[0] = [0,inputArray[i]]}
        else if (inputArray[i] > currentMax[0][1]) {currentMax = [[i,inputArray[i]]]}
        else if (inputArray[i] == currentMax[0][1]) {currentMax.push([i,inputArray[i]])}
    }
    return currentMax
}
