# array-toolkit

Some dope tools for Javascript array manipulation.

This tool is developed by [Renick Bell](https://renickbell.net/doku.php?id=start)(<renick@gmail.com>), Steve Wang(<stevesg168@gmail.com>) and, Yiler Huang(<yiler7777@gmail.com>).

This tools uses the [Ramda](https://ramdajs.com/) library. It also used the same methods Ramda uses for allowing the package to be used via await import and require (This package uses some parts of the Ramda package.json and file system desgin).
License is GPL3

## Installation:

```
npm i array-toolkit
```

[Link to page on npm](https://www.npmjs.com/package/array-toolkit)

## Usage:

```
const A = await import('array-toolkit')
```

OR

```
const A = require('array-toolkit')
```

## Files
src contains all the files needed for using the code with require and es contains all the files needed for using the code with await import. All those directories contain the same things except one is in .Js and the other is in .mjs. This design is from [Ramda](https://ramdajs.com/).

## Documentation
Documentation inspired by [p5.js documentation](https://p5js.org/reference/), [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and, [Ramda documentation](https://ramdajs.com/docs/#).
### arrayTransformations


---

---

#### resizeArray
Number -> [*] -> [*]

Resizes the array to a specific length. If the number is smaller than the array length, it will shorten the array. If the number greater than the array length, it will loop the array.

##### Syntax
```
A.resizeArray(number, array)
```
##### Parameters
###### number
The length of the resized array.
###### array
Array to resize.
##### Examples
```
console.log(A.resizeArray(5, [0, 1, 2, 3, 4])) //[ 0, 1, 2, 3, 4 ]
console.log(A.resizeArray(2, [0, 1, 2, 3, 4])) //[ 0, 1 ]
console.log(A.resizeArray(10, [0, 1, 2, 3, 4])) //[0, 1, 2, 3, 4, 0, 1, 2, 3, 4]

```
---

---

#### safeSplice
[*] -> Number -> Number -> * (optional) -> [*]

Does the same thing as normal Javascript splice but does it in a non-mutative way.

Removes a specific number of items starting from an index from the inputArray. If the replaceWith variable is filled, it will replace the space freed up with the value of replaceWith.

##### Syntax
```
A.safeSplice(inputArray, amountToRemove, indexToRemove)
A.safeSplice(inputArray, amountToRemove, indexToRemove, replaceWith)
```
##### Parameters
###### inputArray
The array to modify in a non-mutative way.
###### amountToRemove
Amount of items to remove from the inputArray.
###### indexToRemove
The index to start removing items from.
###### replaceWith
The item to put in the space freed up.
##### Examples
```
console.log(A.safeSplice([0, 1, 2, 3, 4], 1, 2)) //[ 0, 1, 3, 4 ]
console.log(A.safeSplice([0, 1, 2, 3, 4], 3, 2)) //[ 0, 1 ]
console.log(A.safeSplice([0, 1, 2, 3, 4], 1, 2, 100)) //[ 0, 1, 100, 3, 4 ]
```

---

---

#### removeAllInstance
[*] -> * -> [*]

Remove all instances of an item in an array.

##### Syntax 
```
A.removeAllInstance(arr, item)
```

##### Parameters
###### arr
The array to remove items from.
###### item
The item to look for and remove.
##### Examples
```
console.log(A.removeAllInstance([0, 1, 2, 3, 4], 3)) //[ 0, 1, 2, 4 ]
console.log(A.removeAllInstance([0, 1, 2, 3, 4], 6)) //[ 0, 1, 2, 3, 4 ]
console.log(A.removeAllInstance([0, 1, 2, 3, 3], 3)) //[ 0, 1, 2 ]
```

---

---

#### removeFirstInstance
[*] -> * -> [*]

Removes the first instance of an item in an array.

##### Syntax
```
A.removeFirstInstance(arr, item)
```

##### Parameters
###### arr
The array to remove the item from.
###### item
The item to remove from array.

##### Examples
```
A.removeFirstInstance([0, 1, 2, 3, 3], 1) //[ 0, 2, 3, 3 ]
A.removeFirstInstance([0, 1, 2, 1, 3], 1) //[ 0, 2, 1, 3 ]
```

---

---

#### removeAtIndex
[*] -> * -> [*]

Removes an item of the array at a specific index if that item is equal to the inputed item.
##### Syntax
```
A.removeAtIndex(arr, item, index)
```

##### Parameters
###### arr
The array to remove the item from
###### item
The item to check for.
###### index
The index to potential remove an item from.

##### Examples
```
console.log(A.removeAtIndex([0, 1, 2, 3, 4, 5], 3, 1)) //[ 0, 1, 2, 3, 4, 5 ]
console.log(A.removeAtIndex([0, 1, 2, 3, 4, 5], 3, 3)) //[ 0, 1, 2, 4, 5 ]
```

---

---

#### removeMultipleItems
[*] -> [*] -> [*]

It will edit the first array(arr) to remove the items that are in the second array(itemsToRemove). If the items in the second array do not exist in the first array, they will be ignored.
##### Syntax
```
A.removeMultipleItems(arr, itemsToRemove)
```

##### Parameters
###### arr
The array to remove items from.
###### itemsToRemove
The array of items to remove.

##### Examples
```
console.log(A.removeMultipleItems([0, 1, 2, 3], [1, 3])) //[ 0, 2 ]
console.log(A.removeMultipleItems([0, 1, 2, 3], [10, 20, 30])) //[ 0, 1, 2, 3 ]
console.log(A.removeMultipleItems([0, 1, 1, 1], [1])) //[ 0 ]
console.log(A.removeMultipleItems([0, 1, 1, 1], [])) //[ 0, 1, 1, 1 ]
```

---

---

#### scaleToRange
ASK BELL
l*] -> Number -> Number -> Number -> Number -> [*]

Scales an array of values fromm a given input range to a desired output range.
##### Syntax
```
A.scaleToRange(inputArray, inputMin, inputMax, outputMin, outputMax)
```

##### Parameters
Equation: (outputMax - outputMin) / (inputMax - inputMin);
###### inputArray
The array to modify.
###### inputMin
The number to subtract all numbers by. Modifies the scales.
###### inputMax
Modifies the scale.
###### outputMin
Modifies the scale.
###### outputMax
Modifies the scale.

##### Examples
```
console.log(A.scaleToRange([10, 20, 30, 40, 50], 10, 50, 0 , 100)) //[ 0, 25, 50, 75, 100 ]
```

---

---

#### scaleToSum
Number -> [Number] -> [Number]

Scales the elements in the "vals" array proportionally based on the desired "span".

##### Syntax
```
A.scaleToSum(span, vals)
```

##### Parameters
###### span
The desired sum to scale to.
###### vals
The values to scale.

##### Examples
```
console.log(A.scaleToSum(100, [10,20,30,40,50])) //[6.666666666666667, 13.333333333333334, 20, 26.666666666666668, 33.333333333333336]
```

---

---

#### pick
([*]) -> *

Returns a random value from the inputArray.
##### Syntax
```
A.pick(inputArray)
```
##### Parameters
###### inputArray
An array filled with anything.
##### Examples
```
console.log(A.pick([0, 1, 2, 3, 4, 5]))
console.log(A.pick(['hi', 'bye', 'you', 'what']))
```

---

---

#### pickN
Number -> [*] -> [*]

Picks a set number of items randomly in the array.

##### Syntax
```
A.pickN(n, inputArray)
```
##### Parameters
###### n
Number of items to pick out from inputArray.
###### inputArray
The array to pick items from.
##### Examples
```
console.log(A.pickN(10, [0, 1, 2, 3, 4, 5]))
console.log(A.pickN(5,['hi', 'bye', 'you', 'what'])
```

---

---

#### low2HighSort
[*] -> [*]

Sorts the numbers in an array from smallest to largest.
##### Syntax
```
A.low2HighSort(inputArray)
```

##### Parameters
###### inputArray
Array to sort.

##### Examples
```
console.log(A.low2HighSort([1,4,2,3,8,5,7,6])) //[1, 2, 3, 4, 5, 6, 7, 8]
```
---

---

#### high2LowSort
[*] -> [*]

Sorts the numbers in an array from largest to smallest.
##### Syntax
```
A.high2LowSort(inputArray)
```

##### Parameters
###### inputArray
Array to sort.

##### Examples
```
console.log(A.high2LowSort([1,4,2,3,8,5,7,6]) //[8, 7, 6, 5, 4, 3, 2, 1])
```

---

---

#### takeN
[*] -> Number -> [*]

Takes a specific amount of items in an array. If the desired amount of items is longer than the length of the array, repeats it.

##### Syntax
```
A.takeN(inputArray, n)
```

##### Parameters
###### inputArray
The array to modify.
###### n
The length of the array returned.

##### Examples
```
console.log(A.takeN([1,2,3,4,5,6,7], 3)) //[1, 2, 3]
console.log(A.takeN([1,2,3,4,5,6,7], 12)) //[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5]

```

---

---

#### removeUntilEqual
Number -> [*] -> [*]

Removes or subtracts numbers from the number array until the total of all the numbers is equal to the endSum variable.

##### Syntax
```
A.removeUntilEqual(endSum, inputArray)
```

##### Parameters
###### endSum
The total of the output array.
###### inputArray
The array to be modified.

##### Examples
```
console.log(A.removeUntilEqual(10, [2, 5, 3, 5, 3, 2, 1])) //[ 2, 5, 3 ]
console.log(A.removeUntilEqual(10, [2, 5, 5, 5, 3, 2, 1])) //[ 2, 5, 3 ]
console.log(A.removeUntilEqual(0, [10, 20, 30, 40])) //[]
console.log(A.removeUntilEqual(- 5, [2, 3, 4 , 6])) //[]
console.log(A.removeUntilEqual(5, [2, 2])) //[ 2, 2 ]
```

---

---

#### takeTo
Number -> [*] -> [*]

Constructs an output array by repeatedly taking elements from the inputArray until the length of the output reaches the targetLength.

##### Syntax
```
A.takeTo(targetLength, inputArray)
```

##### Parameters
###### targetLength
The target length of the output array.
###### inputArray
The array to take items from.


##### Examples
```
console.log(A.takeTo(10, [1, 3, 4, 5])) //[ 1, 3, 4, 2 ]
console.log(A.takeTo(0, [1, 3, 4, 5])) //[ 0 ]
console.log(A.takeTo(20, [1, 3, 4, 5])) //[ 1, 3, 4, 5, 1, 3, 3 ]
```

---

---

#### loopTo
Number -> [Number] -> [Number]

Loops an array until it meets the target length.
##### Syntax
```
A.loopTo(targetLength, inputArray)
```

##### Parameters
###### targetLength
The target length of the output array.
###### inputArray
THe array to loop items from.

##### Examples
```
console.log(A.loopTo(10, [4, 4])) //[ 4, 4, 2 ]
console.log(A.loopTo(13, [4, 4])) //[ 4, 4, 4, 1 ]
console.log(A.loopTo(10, [2.235, 2])) //[ 2.235, 2, 2.235, 2, 1.5300000000000016 ]
console.log(A.loopTo(4, [3, 3]) //[ 3, 1 ]
console.log(A.loopTo(9, [10, 3])) //[ 9 ]
```

---

---

#### zip
[*] -> [*] -> [{*} ...]

Generated by chatgpt: Takes 2 arrays as arguments and will combine them. Will turn each index of the arrays into sub arrays and will put those of the same index into the same sub array. Will return an array with many sub arrays in it.

##### Syntax
```
A.zip(a, b)
```

##### Parameters
###### a
The function gets the first item of the sub-array from this array.
###### b
The function gets the second item of the sub-array from this array.

##### Examples
```
console.log(A.zip([0, 1, 2, 3], [6, 5, 4, 3])) //[[0, 6], [1, 5], [2, 4], [3, 3]]
```

---

---

#### buildZip
[[*]...] -> [[*]...] -> [[*]...]

Takes 2 arrays as arguments. Each item in the array has to be another array. The function will then return one array which is a combination of the two. The function combines them by combining the sub arays that have the same index.
##### Syntax
```
A.buildZip(a, b)
```

##### Parameters
###### a
An array of array that is being zipped with b (an item or an array)
###### b
An item or an array that is being zipped with a

##### Examples
```
arr1 = [[1,1,1],[2,2,2],[3,3,3]]
arr2 = [[4,4,4],[5,5,5],[6,6,6]]
console.log(A.buildZip(arr1,arr2)) //[ [ 1, 1, 1, 4, 4, 4 ], [ 2, 2, 2, 5, 5, 5 ], [ 3, 3, 3, 6, 6, 6 ] ]
```
---

---

#### shuffle
[*] -> [*]

Shuffle the order of items in an array.
##### Syntax
```
A.shuffle(array)
```

##### Parameters
###### array
The array to modify.

##### Examples
```
console.log(A.shuffle([1,2,3,4,5,6,7])) //[2, 5, 7, 1, 6, 4, 3]
```

---

---

#### gatherBySubstring
[string | []] -> [*] -> [string | []]

Removes the elements in the inputArray that do not contain parts of the substringArray.
##### Syntax
```
A.gatherBySubstring(inputArray, substringArray)
```

##### Parameters
###### inputArray
The array that is being filtered
###### substringArray
An array of substrings to filter inputArray with.

##### Examples
```
let filteredArray = A.gatherBySubstring(inputArray, substringArray);
console.log(filteredArray); //[ 'banana', 'cherry', 'grape' ]
```

---

---

#### flipBooleans
[boolean] -> [boolean]

Goes through the array and changes false to true and true to false
##### Syntax
```
A.flipBooleans(arr)
```

##### Parameters
###### arr
The array to modify.

##### Examples
```
console.log(A.flipBooleans([true, true, false, true])) //[false, false, true, false]
```

---

---
### dataToArray
#### buildArray
Number -> function -> [*]

Takes a function and make the outputs from it an array, the function can use the current index as an argument.
##### Syntax
```
A.buildArray(n, fillFunction)
```

##### Parameters
###### n
The desired length of the output array.
###### fillFunction
The function used to build the array.

##### Examples
```
console.log(buildArray(10, i => i * 10)) //[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
```

---

---
#### linearArray
Number -> Number -> Number -> [Number]

Linear array returns a number array where all the numbers are increasing order. Start is the starting point and the first number. Step is the difference between each number and numberOfSteps is the length of the array returned.
##### Syntax
```
A.linearArray(start,step, numberOfSteps)
```

##### Parameters
###### start
The start value of the array of numbers
###### step
The steps between each number
###### numberOfSteps
The length of the output array.

##### Examples
```
console.log(A.linearArray(0,2,10)) //[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

---

---

#### integerArray
Number -> Number -> [Number]

Makes an array filled with integers, the starting and the length of output array can be specified.
##### Syntax
```
A.integerArray(start, numberOfSteps)
```

##### Parameters
###### start
The start value of the array of numbers
###### numberOfSteps
The length of the ouput array.

##### Examples
```
console.log(integerArray(3, 30)) //[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
```

---

---

#### geometricArray
Number -> Number -> Number -> [Number]

Makes an array of numbers, you can specify the gap between each number.

##### Syntax
```
A.geometricArray(start, step, numberOfSteps)
```

##### Parameters
###### start
The start value of the array of numbers.
###### step
The steps between each number.
###### numberOfSteps
The length of the array.

##### Examples
```
console.log(A.geometricArray(1, 2 ,10)) //[1, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

---

---

### infoFromArray
#### findClosest
[*] -> * -> function -> {index: Number, item: *}

Finds the largest number smaller than the "item" argument within an array,
##### Syntax
```
A.findClosest(arr, item, comparatorFn)
```

##### Parameters
###### arr
The array to sort through.
###### item
The item to find closest of.
###### comparatorFn
The conditions to look/compare for.

##### Examples
```
console.log(A.findClosest([0, 1, 2, 3], 2, (inputItem) => {return inputItem.item < 2})) //{ index: 1, item: 1 }
```

---

---

#### findClosestSmaller
[Number] -> Number -> Number

Finds the closest number within the array that is smaller than the "item" argument
##### Syntax
```
A.findClosestSmaller(arr, item)
```

##### Parameters
###### arr
The array of numbers to sort through.
###### item
The number the output has to be larger than.

##### Examples
```
console.log(A.findClosestLarger([1,4,2,6,2,5,7], 5)) //7
```

---

---

#### findClosestLarger
[Number] -> Number -> Number

Finds the closest number within the array that is larger than the "item" argument

##### Syntax
```
A.findClosestLarger(arr, item)
```

##### Parameters
###### arr
The array of numbers to sort through.
###### item
The number the output has to be larger than.

##### Examples
```
console.log(A.findClosestLarger([1,4,2,6,2,5,7], 5)) //7
```

---

---

#### findMostFrequentItem
[*] -> *

Find most frequent item that appears in array: change to find most frequen item

##### Syntax
```
A.findMostFrequentItem(array)
```

##### Parameters
###### array
The array to get most frequent item from.

##### Examples
```
console.log(A.findMostFrequentItem([1,1,1,2,2,2,2,2,2,3,3,3,3,3])) //2
```

---

---

#### sum
[Number] -> Number

Adds up all the numbers in an array

##### Syntax
```
A.sum(inputArray)
```

##### Parameters
##### inputArray
The array to sum up.

##### Examples
```
console.log(A.sum([1,2,3])) //6
```

---

---

#### runningSum
Number -> [Number] -> [Number]

Adds up all the numbers with a starting value, similar to sum.

##### Syntax
```
A.runningSum(startingVal, inputArray)
```

##### Parameters
###### startingVal
The number to add all the numbers in the array to.
###### inputArray
The array of numbers to add startingVal to.

##### Examples
```
console.log(runningSum(10, [1,2,3])) //[11, 13, 16]
```

---

---

#### mean
[Number] -> Number

Calculates the average of all the numbers in an array.

##### Syntax
```
A.mean(inputArray)
```

##### Parameters
###### inputArray
The array of numbers to find the average of.

##### Examples
```
console.log(A.mean([1,2,3,4])) //2.5
```

---

---

#### includesOneOf
[*] -> [*] -> boolean

Returns true if two arrays share the same item, false if they don't.

##### Syntax
```
A.includesOneOf(inputArray, things)
```

##### Parameters
###### inputArray
Array to sort through.
###### things 
Array of items to look for.

##### Examples
```
console.log(A.includesOneOf([0, 1, 2, 3], [2, 1000])) //true
console.log(A.includesOneOf([0, 1, 2, 3], [5, 1000])) //false
```

---

---

#### matchesOneOf
[*] -> * => boolean

Generic function to find index values based on a comparator function.
##### Syntax
```
A.getIndexValues(inputArray, comparatorFn)
```

##### Parameters
###### inputArray
Array to sort through.
###### comparatorFn
Conditions to compare items by.

##### Examples
```
console.log(A.getIndexValues([5, 3, 1, 6], (a, b) => {return a - b})) //[ [ 2, 1 ] ]
console.log(A.getIndexValues([5, 3, 8, 6], (a, b) => {return a - b})) //[ [ 1, 3 ] ]
```

---

---

#### getIndexValues
[*] -> function -> [[Number, *] ...]

Generic function to find index values based on a comparator function.
##### Syntax
```
A.getIndexValues(inputArray, comparatorFn)
```

##### Parameters
###### inputArray
Array to sort through.
###### comparatorFn
Conditions to compare items by.

##### Examples
```
console.log(A.getIndexValues([5, 3, 1, 6], (a, b) => {return a - b})) //[ [ 2, 1 ] ]
console.log(A.getIndexValues([5, 3, 8, 6], (a, b) => {return a - b})) //[ [ 1, 3 ] ]
```

---

---

#### getMinIndex
[*] -> [[Number, Number] ...]

Returns all the instances of the smallest value in the inputArray with the index and the value of that number.
##### Syntax
```
A.getMinIndex(inputArray)
```

##### Parameters
###### inputArray
Array to sort through.

##### Examples
```
console.log(A.getMinIndex([5, 3, 8, 6])) //[ [ 1, 3 ] ]
console.log(A.getMinIndex([0, 1, 2, 3, 4])) //[ [ 0, 0 ] ]
```

---

---

#### getMaxIndex
[*] -> [[Number, Number] ...]

Checks if an array of numbers is arranged in an ascending order.
##### Syntax
```
A.getMaxIndex(inputArray)
```

##### Parameters
###### inputArray
Array to sort through.

##### Examples
```
console.log(A.getMaxIndex([0, 1, 2, 3, 4])) //[ [ 4, 4 ] ]
console.log(A.getMaxIndex([5, 8, 3, 6])) //[ [ 1, 8 ] ]
```

---

---

#### isArrayAscending
[Number] -> boolean

Checks if an array of numbers is arranged in an ascending order.
##### Syntax
```
A.isArrayAscending(numbersArray)
```

##### Parameters
###### numbersArray
Array to check.

##### Examples
```
console.log(A.isArrayAscending([0, 1, 2, 3, 4, 5])) //true
console.log(A.isArrayAscending([0, 1, 2, 3, 4, 2])) //false
```

---

---

#### isArrayDescending
[Number] -> boolean

Checks if an array of numbers is arranged in an descending order.
##### Syntax
```
A.isArrayDescending(numbersArray)
```

##### Parameters
###### numbersArray
Array to check.

##### Examples
```
console.log(A.isArrayDescending([0, 1, 2, 3])) //false
console.log(A.isArrayDescending([3, 2, 1, 0])) //true
console.log(A.isArrayDescending([3, 5, 1, 0])) //false
```

---

---


### R
R is where the the [Ramda](https://ramdajs.com/)  package is stored so that array-toolkit can use it.
## Development

### Test

```
npm run test
```
