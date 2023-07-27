// --------------------------------------------------------------------------
// -- infoFromArray.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//Finds the closest number within an array that is smaller than the "num" argument:
function findClosest (arr, item, comparatorFn){
    let mid = arr.indexOf(item)
    let left = mid - 1
    let right = mid + 1
    while (left > 0 || right < arr.length){
        if (left < 0){}
        else if (comparatorFn(arr[left], item) === true){
            return {item: arr[left], index: left}
        }
        else{
            left -= 1
        }
        if (right > arr.length){}
        else if (comparatorFn(arr[right], item) === true){
            return {item: arr[right], index: right}
        }
        else {
            right += 1
        }
    }
    return false
}

//Finds the closest number within the array that is smaller than the "num" argument:
function findClosestSmaller (arr, item) {
    return findClosest(arr, item, (a, b) => {return a < b}).item
}

//Finds the closest number within the array that is larger than the "num" argument:
function findClosestLarger (arr, item) {
    return findClosest(arr, item, (a, b) => {return a > b}).item
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

//Adds up all the numbers in an arrau\y
function sum (inputArray) {
    return inputArray.reduce((acc,cur) => {return acc + cur},0)
}

//Adds up all the numbers with a starting value, similar to sum.
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

//Calculates the average of all the numbers in an array.
function mean (inputArray) {
      return sum(inputArray)/inputArray.length
}

//Returns true if two arrays share the same item, false if they don't.
function includesOneOf (inputArray, things) {
    let bools = things.map(t => inputArray.includes(t));
    if (bools.includes(true)) {return true} else {return false}
}

//Returns true if a variable matches another, false if they don't.
function matchesOneOf (candidates, thing) {
    return includesOneOf([thing],candidates)
}

//Generated by chatgpt:
// Generic function to find index values based on a comparator function
function getIndexValues(inputArray, comparatorFn) {
    let currentIndexValues = [];
    for (let i = 0; i < inputArray.length; i++) {
        if (currentIndexValues.length === 0) {
            currentIndexValues.push([i, inputArray[i]]);
        } else {
            const comparisonResult = comparatorFn(inputArray[i], currentIndexValues[0][1]);
            if (comparisonResult < 0) {
                currentIndexValues = [[i, inputArray[i]]];
            } else if (comparisonResult === 0) {
                currentIndexValues.push([i, inputArray[i]]);
            }
        }
    }
    return currentIndexValues;
}

//Generated by chatgpt:
// Specific functions for finding the minimum and maximum index values
function getMinIndex(inputArray) {
    return getIndexValues(inputArray, (a, b) => {return a - b});
}

//Generated by chatgpt:
//Gets the biggest number in an array.
function getMaxIndex(inputArray) {
    return getIndexValues(inputArray, (a, b) => {return b - a});
}
