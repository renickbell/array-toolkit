// --------------------------------------------------------------------------
// -- infoFromArray.mjs
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

/**
  * Finds the largest number smaller than the "item" argument within an array,
  * @param {array} arr - The array to sort through.
  * @param item - The item to find the closest of
  * @param {function} comparatorFn - The conditions to look/compare for.
  * @example console.log(findClosest([0, 1, 2, 3], 2, (inputItem) => {return inputItem.item < 2})) //{ index: 1, item: 1 }
*/
export function findClosest (arr, item, comparatorFn){
    let mid = arr.indexOf(item)
    let left = mid
    let right = mid 
    let sortedArray = arr.map((x, i) => {
        if (i % 2 === 0 && left > 0){
            left -= 1
            return {index: left, item: arr[left]}
        }
        else if (right < arr.length - 1){
            right += 1
            return {index: right, item: arr[right]}
        }
        else {
            left -= 1
            return {index: left, item: arr[left]}
        }
    })
    sortedArray.pop() 
    return sortedArray[sortedArray.findIndex(comparatorFn)]
}

/**
  * Finds the closest number within the array that is smaller than the "item" argument
  * @param {array} arr - the array to get the item from
  * @param item - the item to compare value with other items within the array
  * @example console.log(findClosestSmaller([1,4,2,6,2,5,7], 5)) //2
*/
export function findClosestSmaller(arr, item) {
    return this.findClosest(arr, item, (inputItem) => {
        return inputItem.item < item;
    }).item;
}

/**
  * Finds the closest number within the array that is larger than the "item" argument
  * @param {array} arr - the array to get the item from
  * @param item - the item to compare value with other items within the array
  * @example console.log(findClosestLarger([1,4,2,6,2,5,7], 5)) //7
*/
export function findClosestLarger (arr, item) {
    return this.findClosest(arr, item, (inputItem) => {
        return inputItem.item > item;
    }).item;
}

/**
  * Find most frequent item that appears in array: change to find most frequen item
  * @param {array} array - the array to get the most frequent item from
  * @example console.log(findMostFrequentItem([1,1,1,2,2,2,2,2,2,3,3,3,3,3])) //2
*/
export function findMostFrequentItem(array) {
    let itemCounts = new Map();
    let maxItem = array[0];
    let maxCount = 0;
    array.forEach((x, i) => {
        let item = array[i];
        if (itemCounts.has(item)) {
            itemCounts.set(item, itemCounts.get(item) + 1);
        } else {
            itemCounts.set(item, 1);
        }
        let currentCount = itemCounts.get(item);
        if (currentCount > maxCount) {
            maxItem = item;
            maxCount = currentCount;
        }
    })
    return maxItem;
}

/**
  * Adds up all the numbers in an array
  * @param {number[]} inputArray - the array to sum
  * @example console.log(sum([1,2,3])) //6
*/
export function sum(inputArray) {
    return inputArray.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
}

/**
  * Adds up all the numbers with a starting value, similar to sum.
  * @param {number} startingVal - the starting value of the output
  * @param {number[]} inputArray - the array to sum
  * @example console.log(runningSum(10, [1,2,3])) //[11, 13, 16]
*/
export function runningSum(startingVal, inputArray) {
  let currentSum = startingVal;
  return inputArray.reduce((resultArray, element) => {
    let newSum = element + currentSum;
    currentSum = newSum;
    resultArray.push(newSum);
    return resultArray;
  }, []);
}

/**
  * Calculates the average of all the numbers in an array.
  * @param {number[]} inputArray - an array of numbers
  * @example console.log(mean([1,2,3,4])) //2.5
*/
export function mean(inputArray) {
    return this.sum(inputArray) / inputArray.length;
}

/**
  * Returns true if two arrays share the same item, false if they don't.
  * @param {array} inputArray - Array to sort through.
  * @param {array} things - Array of items to look for.
  * @example
  * console.log(includesOneOf([0, 1, 2, 3], [2, 1000])) //true
  * console.log(A.includesOneOf([0, 1, 2, 3], [5, 1000])) //false
*/
export function includesOneOf(inputArray, things) {
    let bools = things.map((t) => inputArray.includes(t));
    if (bools.includes(true)) {
        return true;
    } else {
        return false;
    }
}

/**
  * Returns true if a variable matches another, false if they don't.
  * @param {array} candidates - The array to sort through.
  * @param thing - The item to search for.
  * @example console.log(matchesOneOf([0, 1 , 2, 3], 3)) //true
*/
export function matchesOneOf(candidates, thing) {
    return this.includesOneOf([thing], candidates);
}

/**
  * Generic function to find index values based on a comparator function.
  * @param {array} inputArray - Array to sort through.
  * @param {function} comparatorFn - Conditions to compare items by.
  * @example
  * console.log(getIndexValues([5, 3, 1, 6], (a, b) => {return a - b})) //[ [ 2, 1 ] ]
  * console.log(getIndexValues([5, 3, 8, 6], (a, b) => {return a - b})) //[ [ 1, 3 ] ]
*/
export function getIndexValues(inputArray, comparatorFn) {
    let currentIndexValues = [];
    inputArray.forEach((x, i) =>{
        if (currentIndexValues.length === 0) {
            currentIndexValues.push([i, inputArray[i]]);
        } else {
            let comparisonResult = comparatorFn(
                inputArray[i],
                currentIndexValues[0][1]
            );
            if (comparisonResult < 0) {
                currentIndexValues = [[i, inputArray[i]]];
            } else if (comparisonResult === 0) {
                currentIndexValues.push([i, inputArray[i]]);
            }
        }
    })
    return currentIndexValues;
}

/**
  * Returns all the instances of the smallest value in the inputArray with the index and the value of that number.
  * @param {array} inputArray - Array to sort through.
  * @example
  * console.log(getMinIndex([5, 3, 8, 6])) //[ [ 1, 3 ] ]
  * console.log(getMinIndex([0, 1, 2, 3, 4])) //[ [ 0, 0 ] ]
*/
export function getMinIndex(inputArray) {
    return this.getIndexValues(inputArray, (a, b) => {
        return a - b;
    });
}

/**
  * Returns all the instances of the largest value in the inputArray with the index and the value of that number.
  * @param {array} inputArray - Array to sort through.
  * @example
  * console.log(getMaxIndex([0, 1, 2, 3, 4])) //[ [ 4, 4 ] ]
  * console.log(getMaxIndex([5, 8, 3, 6])) //[ [ 1, 8 ] ]
*/
export function getMaxIndex(inputArray) {
    return this.getIndexValues(inputArray, (a, b) => {
        return b - a;
    });
}

/**
  * Checks if an array of numbers is arranged in an ascending order.
  * @param {array} numbersArray - Array to check.
  * console.log(isArrayAscending([0, 1, 2, 3, 4, 5])) //true
  * console.log(isArrayAscending([0, 1, 2, 3, 4, 2])) //false
*/
export function isArrayAscending(numbersArray) {
  return numbersArray.every((num, index) => {
    if (index === 0) {
      return true; // The first element is always considered in ascending order
    }
    return typeof num === 'number' && num > numbersArray[index - 1];
  });
}

/**
  * Checks if an array of numbers is arranged in an descending order.
  * @param {array} numbersArray - Array to check.
  * console.log(isArrayDescending([0, 1, 2, 3])) //false
  * console.log(isArrayDescending([3, 2, 1, 0])) //true
  * console.log(isArrayDescending([3, 5, 1, 0])) //false
*/
export function isArrayDescending(numbersArray) {
  return numbersArray.every((num, index) => {
    if (index === 0) {
      return true; // The first element is always considered in ascending order
    }
    return typeof num === 'number' && num < numbersArray[index - 1];
  });
}
//modified from isArrayAscending.

// module.exports = {
//     findClosest,
//     findClosestSmaller,
//     findClosestLarger,
//     findMostFrequentItem,
//     sum,
//     runningSum,
//     mean,
//     includesOneOf,
//     matchesOneOf,
//     getIndexValues,
//     getMinIndex,
//     getMaxIndex,
// };
