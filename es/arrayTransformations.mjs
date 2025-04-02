// --------------------------------------------------------------------------
// -- arrayTransformations.mjs
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//requiring it locally:
// let buildArray = require('./dataToArray.js').buildArray;

/**
  * Set a size of the array and the array will be expanded or shrunk to fix that size. To expand it will just loop the array:
  * Does the same thing as adjustArrayLength but does it differently
  * @param {number} number - the desired length of adjusted array
  * @param {array} array - the array to modify
  * @example console.log(resizeArray(5, [0,1,2])) // [0, 1, 2, 0, 1]
*/
export function resizeArray(number, array) {
    let arrayLength = array.length;
    if (arrayLength >= number) {
        return array.slice(0, number);
    }
    let repetitions = Math.ceil(number / arrayLength);
    let expandedArray = new Array(repetitions).fill(array).flat();
    return expandedArray.slice(0, number);
}

/**
  * Similar to the built-in slice function but with additional arguments that decide how many items to remove in a array and what they will be replaced with.
  * @param {array} inputArray - the array to modify
  * @param {number} amountToRemove -  the amount of items to remove in inputArray
  * @param {number} indexToRemove - which index to remove from
  * @param replaceWith - what to replace the removed items with (optional)
  * @example console.log(safeSplice([0,1,2,3,4,5,6,7], 3, 3, "tortoise")) //[0, 1, 2, 'tortoise', 6, 7]
*/
export function safeSplice(inputArray, amountToRemove, indexToRemove, replaceWith) {
    let array1 = inputArray.slice(0, indexToRemove);
    if (replaceWith != undefined) {
        array1.push(replaceWith);
    }
    let array2 = inputArray.slice(indexToRemove + amountToRemove, inputArray.length);
    return array1.concat(array2);
}

/**
  * Remove all instances of an item in an array.
  * @param {array} arr - the array to modify
  * @param item - the item/items to remove
  * @example console.log(removeAllInstance([1,2,3,4,3,2,1], 3)) //[1, 2, 4, 2, 1]
  */
export function removeAllInstance(arr, item) {
    if (item === undefined){
        return arr
    }
    return arr.filter((f) =>{
        if (f instanceof Object === true && util.isDeepStrictEqual(f, item) === true){
            return false
        }
        else if (f === item){
            return false
        }
        else {
            return true
        }
    })
}

/**
  * Removes an item the first time it appears.
  * @param {array} arr - the array to modify
  * @param item - the item/items to remove
  * @example console.log(removeFirstInstance([1,2,3,4,3,2,1], 3)) //[1, 2, 4, 3, 2, 1]
*/
export function removeFirstInstance(arr, item){
    let index = arr.indexOf(item);
    if (index === -1){
        arr.every((x, i) =>{
            if (x instanceof Array === false && x instanceof Object === true && util.isDeepStrictEqual(x, item) === true) {
                index = i
                return false
            }
            else {
                return true
            }
        })
    }
    if (index > -1){
        return this.safeSplice(arr, 1, index)
    }
    return arr
}

/**Remove the item at a specific index of an array.
  * @param {array} arr - the array to modify
  * @param item - the item to remove
  * @param {number} index - index to remove
  * @example console.log(removeAtIndex([1,2,3,4,3,2,1], 4, 3)) //[1, 2, 3, 3, 2, 1]
*/
export function removeAtIndex(arr, item, index){
    if (arr[index] == item){
         return this.safeSplice(arr, 1, index)
    }
    return arr
}

/**
  * Takes two arrays as arguments. The second array is the items to remove from the first array.
  * @param {array} arr - array to modify
  * @param item - what items to remove as an array
  * @example console.log(removeMultipleItems([1,2,3,4,3,2,1], [2,3])) //[1, 4, 1]
*/
export function removeMultipleItems(arr, itemsToRemove) {
    return arr.filter((x) =>{
        if (x instanceof Array === false && x instanceof Object === true){
            return !itemsToRemove.every(r => util.isDeepStrictEqual(x, r))
        }
        return !itemsToRemove.includes(x)
    });
}

/**
 * Scales an array of values from a given input range to a desired output range.
 *
 * @param {array} inputArray - An array of numbers to be scaled.
 * @param {number} inputMin - The minimum value of the input range.
 * @param {number} inputMax - The maximum value of the input range.
 * @param {number} outputMin - The minimum value of the desired output range.
 * @param {number} outputMax - The maximum value of the desired output range.
 * @example console.log(scaleToRange([10, 20, 30, 40, 50], 10, 50, 0 , 100)) //[0, 25, 50, 75, 100]
 */
export function scaleToRange(inputArray, inputMin, inputMax, outputMin, outputMax) {
    // add a check to make sure that inputMin and inputMax are not exceeded by values in inputArray?
    let scale = (outputMax - outputMin) / (inputMax - inputMin);
    return inputArray.map((x) => (x - inputMin) * scale + outputMin);
}

/*
  * scales the elements in the "vals" array proportionally based on the desired "span".
  * @param {number} span - The desired sum to scale the values to.
  * @param {number[]} vals - An array of numerical values to be scaled.
  * @example console.log(scaleToSum(100, [10,20,30,40,50])) //[6.666666666666667, 13.333333333333334, 20, 26.666666666666668, 33.333333333333336]
**/
export function scaleToSum(span, vals) {
    let inputSum = this.sum(vals);
    return vals.map((x) => (x * span) / inputSum);
}

/**
  * Picks an item randomly in an array.
  * @param {array} inputArray - the array to pick an item from
  * @example
  * console.log(pick([1,2,3,4])) //4
  * console.log(pick([1,2,3,4])) //1
  * console.log(pick([1,2,3,4])) //2
  * console.log(pick([1,2,3,4])) //3
*/
export function pick(inputArray) {
    return inputArray[Math.round((inputArray.length - 1) * Math.random())];
}

/**
  * Picks multiple items randomly in an array.
  * @param {number} n - the desired number of item that are picked
  * @param {array} inputArray - the array to pick items from
  * @example console.log(pickN(3, [1,2,3,4,5,6,7,8,9])) //[9, 5, 8]
*/
export function pickN(n, inputArray) {
    return this.buildArray(n, (i) => pick(inputArray));
}

/**
  * Sort the numbers in an array from small to big.
  * @param {array} inputArray - the array to modify
  * @example console.log(low2HighSort([1,4,2,3,8,5,7,6])) //[1, 2, 3, 4, 5, 6, 7, 8]
*/
export function low2HighSort(inputArray) {
    return inputArray.sort((a, b) => a - b);
}

/**
  * Sort the numbers in an array from big to small.
  * @param {array} inputArray - the array to modify
  * @example console.log(high2LowSort([1,4,2,3,8,5,7,6]) //[8, 7, 6, 5, 4, 3, 2, 1]
*/
export function high2LowSort(inputArray) {
    return inputArray.sort((a, b) => b - a);
}

/**
  * Takes a specific amount of items in an array. If the desired amount of items is longer than the length of the array, repeats it.
  * @param {array} inputArray - the array to take items from
  * @param {number} n - the desired amount of item taken from inputArray
  * @example
  * console.log(takeN([1,2,3,4,5,6,7], 3)) //[1, 2, 3]
  * console.log(takeN([1,2,3,4,5,6,7], 12)) //[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5]
*/
export function takeN(inputArray, n) {
    return Array.from({ length: n }, (_, index) => inputArray[index % inputArray.length]);
}

/**
  * Removes or subtracts numbers from the number array until the total of all the numbers is equal to the endSum variable.
  * @param {number} endSum - The total of the output array.
  * @param {array} inputArray - The array that should be changed.
  * @example
  * console.log(removeUntilEqual(10, [2, 5, 3, 5, 3, 2, 1])) //[ 2, 5, 3 ]
  * console.log(removeUntilEqual(10, [2, 5, 5, 5, 3, 2, 1])) //[ 2, 5, 3 ]
  * console.log(removeUntilEqual(0, [10, 20, 30, 40])) //[]
  * console.log(removeUntilEqual(- 5, [2, 3, 4 , 6])) //[]
  * console.log(removeUntilEqual(5, [2, 2])) //[ 2, 2 ]
*/
export function removeUntilEqual (endSum, inputArray){
    let originalSum = this.sum(inputArray)
    if (endSum >= originalSum){
        return inputArray
    }
    let diff = Math.abs(originalSum - endSum)
    let outputArray = inputArray
    inputArray.forEach((x, i) =>{
        let targetNum = inputArray[inputArray.length - 1 - i]
        if (diff === 0){
            return true
        }
        else if (targetNum > diff === true){
            outputArray = this.safeSplice(outputArray, 1, inputArray.length - 1 - i, targetNum - diff)
            diff = 0
        }
        else {
            diff -= targetNum
            outputArray = this.safeSplice(outputArray, 1, inputArray.length - 1 - i)
        }
    })
    return outputArray
}

/**
  * Constructs an output array by repeatedly taking elements from the inputArray until the length of the output reaches the targetLength.
  * @param {number} targetLength - the target length of the output array
  * @param {array} inputArray - the array to take items from
  * @todo negative inputs for targetLength are broken.
  * @example
  * console.log(takeTo(10, [1, 3, 4, 5])) //[ 1, 3, 4, 2 ]
  * console.log(takeTo(0, [1, 3, 4, 5])) //[ 0 ]
  * console.log(takeTo(20, [1, 3, 4, 5])) //[ 1, 3, 4, 5, 1, 3, 3 ]
*/
export function takeTo (targetLength, inputArray){
    let originalSum = this.sum(inputArray)
    if (targetLength === 0){
      return [0]
    }
    else if (originalSum === targetLength){
        return inputArray
    }
    let repetitions = Math.ceil(targetLength / originalSum)
    return this.removeUntilEqual(targetLength, this.R.repeat(inputArray, repetitions).flat())
}

/**
  * Loops an array until its length meets the target length.
  * @param {number} targetLength - the target length of the output array
  * @param {array} inputArray - the array to loop items from
  * @example
*/
export function loopTo(targetLength, inputArray) {
    let inputSum = this.sum(inputArray);
    let loopN = Math.ceil(targetLength / inputSum);
    let pre = this.R.flatten(this.buildArray(loopN, (x) => inputArray));
    return this.takeTo(targetLength, pre);
}

//Non ramda version:
// export function zip (a,b) {return a.map((x, i) => { return [x, b[i]]; })}

/**
  * randa version:
  * Takes 2 arrays as arguments and will combine them. Will turn each index of the arrays into sub arrays and will put those of the same index into the same sub array. Will return an array with many sub arrays in it.
  * @param {array} a - the array to zip with another one, the values of a will be at the first index in the zipped array
  * @param {array} a - the array to zip with another one, the values of a will be at the second index in the zipped array
  * @example
    console.log(zip([0, 1, 2, 3], [6, 5, 4, 3])) //[[0, 6], [1, 5], [2, 4], [3, 3]]
*/
export function zip(a, b) {
    return this.R.zip(a, b);
}

/**
  * Takes 2 arrays as arguments. Each item in the array has to be another array. The function will then return one array which is a combination of the two. The function combines them by combining the sub arays that have the same index.
  * a is an array of arrays; this function concats b onto each of the arrays in a. b could be either an item or an array.
  * @param {array} a - an array of array that is being zipped with b (an item or an array)
  * @param b - an item or an array that is being zipped with a
  * @example
  * arr1 = [[1,1,1],[2,2,2],[3,3,3]]
  * arr2 = [[4,4,4],[5,5,5],[6,6,6]]
  * console.log(buildZip(arr1,arr2)) //[ [ 1, 1, 1, 4, 4, 4 ], [ 2, 2, 2, 5, 5, 5 ], [ 3, 3, 3, 6, 6, 6 ] ]
  * non ramda version:
  * function buildZip (a,b) {return a.map((x,i) => x.concat(b[i]))}
  * ramda version:
*/
export function buildZip(a, b) {
    return this.R.zipWith(this.R.concat, a, b);
}

/**
  * Shuffle the order of items in an array.
  * @param {array} array - the array to modify
  * @example console.log(shuffle([1,2,3,4,5,6,7])) //[2, 5, 7, 1, 6, 4, 3]
*/
export function shuffle(array) {
    return array.reduceRight(
        (acc, _, currentIndex) => {
            let randomIndex = Math.floor(this.randomRange(0, currentIndex + 1, 5));
//             let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            [acc[currentIndex], acc[randomIndex]] = [acc[randomIndex], acc[currentIndex]];
            return acc;
        },
        [...array]
    );
}
// knuth shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

/**
 * Filters the inputArray based on whether any of the substrings in substringArray are found in each element.
 * @param {array} inputArray - the array that is being filtered
 * @param {string} substringArray - an array of substrings to filter inputArray with
 * @example
 * const inputArray = ["apple", "banana", "cherry", "date", "grape"];
 * const substringArray = ["an", "ch", "pe"];
 *
 * const filteredArray = gatherBySubstring(inputArray, substringArray);
 * console.log(filteredArray); //['apple', 'banana', 'cherry', 'grape']
*/
export function gatherBySubstring(inputArray, substringArray) {
    return inputArray.filter((x) => substringArray.some((y) => x.includes(y)));
}

/**
 * Flips a bolean. If input is true, returns false. If inputs is false, return true.
 * @param {array} array - an array of booleans
 * @example console.log(flipBooleans([true, true, false, true])) //[false, false, true, false]
*/
export function flipBooleans(arr) {
    return arr.map((a) => !a);
}

/**
 * Rotates an array of items. Basically wraps array and moves the items in the array.
 * @param {array} xs - items
 * @param {number} count - the remainder of this and the length of xs will be the loop point.
 * @example
 * console.log(rotate([0, 1, 2, 3, 4 ,5 ], 10))
 * console.log(rotate([0, 1, 2, 3], 10))
 * console.log(rotate(['a', 'b', 'c' ], 5))
 * @see https://stackoverflow.com/a/30646964/19515980
*/
export function rotate (xs, count) {
  var n = -(count % xs.length);
  return xs.slice(n).concat(xs.slice(0, n));
}

/**
 * Rotates an array of items. Basically wraps array and moves the items in the array but in the opposite direction compared to rotate function.
 * @param {array} xs - items
 * @param {number} count - the remainder of this and the length of xs will be the loop point.
 * @example
 * console.log(rotateCounter([0, 1, 2, 3, 4 ,5 ], 10))
 * console.log(rotateCounter([0, 1, 2, 3], 10))
 * console.log(rotateCounter(['a', 'b', 'c' ], 5))
 * @see https://stackoverflow.com/a/30646964/19515980
*/
export function rotateCounter (xs, count) {
  var n = count % xs.length;
  return xs.slice(n).concat(xs.slice(0, n));
}

/**
 * Interleaves two arrays. Takes an item from arr1 and another from arr2 then repeats until none left.
 * @param {array} arr1
 * @param {array} arr2
 * @example console.log(interleave([1, 1, 1], [2, 2, 2]))
*/
export function interleave (arr1, arr2) {
    let outputArray = [];
    if (arr1.length > arr2.length){
        arr1.forEach((x,i) => {outputArray.push(x);outputArray.push(arr2[i%arr2.length])})
    }
    else {
        arr2.forEach((x,i) => {outputArray.push(arr1[i%arr1.length]);outputArray.push(x)})
    }
    return outputArray
}

/**
 * Interleaves multiple arrays. Takes an item from each array and puts in the the outputArray. This actions is then repeated until all items from the longest array have been input into the outpuArray.
 * @param {array} arrays - Contains the arrays to interleave.
 * @example console.log(interleaveN([[1, 1, 1], [2, 2, 2], [3, 3, 3]]))
*/
export function interleaveN (arrays) {
    let outputArray = [];
    let lengths = arrays.map(x => x.length);
    let targetLength = this.getMaxIndex(lengths)[0];
    let longestArray = arrays[targetLength[0]];
    longestArray.forEach((x,i) => {arrays.forEach(a => outputArray.push(a[i%a.length]))})
    return outputArray
}

/**
 * Returns an Array that has all the items of inputArray but the number of times each item appears is defined by the corresponding values of stutterCount.
 * @param {array} inputArray - The items that appear in the outputArray.
 * @param {array} stutterCounts = Number of times each item in inputArray should appear.
 * @example console.log(stutterN(['a', 'b', 'c'], [2, 3, 4]))
*/
export function stutterN (inputArray, stutterCounts) {
    let outputArray = [];
    let stutterBases = stutterCounts.map(x => this.buildArray(x, i => i));
    inputArray.forEach((x,i) => stutterBases[i%stutterBases.length].forEach(s => outputArray.push(x)))
    return outputArray
}

/**
 * Wrapper for the stutterN function that only allows one number for stutterCount.
 * @param {array} inputArray - The items that appear in the outputArray.
 * @param {number} stutterCount - Number of times each item in inputArray should appear.
 * @example console.log(stutter(['a', 'b', 'c'], 2))
*/
export function stutter (inputArray, stutterCount) {
    return this.stutterN (inputArray, [stutterCount])
}

/**
 * Replaces items at every period.
 * @param {array} inputArray - Original array.
 * @param {} replacementItem - Replacement amount.
 * @example
 * console.log(replacePeriodically(['a', 'a', 'a', 'a', 'a', 'a', 'a'], 'b', 2))
 * console.log(replacePeriodically(['a', 'a', 'a', 'a', 'a', 'a', 'a'], 'b', 4))
*/
export function replacePeriodically (inputArray, replacementItem, period) {
    if (Number.isInteger(period) === false) {
        period = Math.floor(period)
    }
    return inputArray.map((x,i) => {
        if (i % period === 0) {
            return replacementItem
        }
        else {
            return x
        }
    })
}

/**
 * Adds items at every period.
 * @param {array} inputArray - Original array.
 * @param {} itemToAdd - Replacement amount.
 * @example
 * console.log(addPeriodically(['a', 'a', 'a', 'a', 'a', 'a', 'a'], 'b', 2))
 * console.log(addPeriodically(['a', 'a', 'a', 'a', 'a', 'a', 'a'], 'b', 4))
*/
export function addPeriodically (inputArray, itemToAdd, period) {
    if (Number.isInteger(period) === false) {
        period = Math.floor(period)
    }
    return inputArray.flatMap((x, i) => {
        if (i % period === 0) {
            return [itemToAdd, x]
        }
        else {
            return x
        }
    })
}

//generate by chatGPT
export function duplicateItems(arr, count) {
    return arr.flatMap(item => this.buildArray(count, () => {return item}));
}

export function duplicateItemsV2(arr, count) {
    let outArray = this.R.clone(arr)
    let finalCount = Math.ceil(count / outArray.length)
    outArray = outArray.flatMap(item => this.buildArray(finalCount, () => {return item}));
    outArray.length = count;
    return outArray
}

export function pickAndRemove(inputArray) {
//     let outputItem = inputArray[Math.round((inputArray.length - 1) * Math.random())];
//     inputArray.splice(inputArray.indexOf(outputItem), 1)
//     return outputItem
    return safeSplice(inputArray, 1, this.randomRange(0, inputArray.length - 1))
}

export function pickAndRemoveItems (inputArray, n) {
//     for (let i = 0; i < n; i++) {
//         let item = inputArray[Math.round((inputArray.length - 1) * Math.random())];
//         inputArray.splice(inputArray.indexOf(item), 1);
//     }
    return this.buildArray(n, () => {}).reduce((accumulator, currentValue) => {
        return this.pickAndRemove(accumulator)
    }, inputArray)
}


