// --------------------------------------------------------------------------
// -- arrayToolkit.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//Takes the length the array should be changed into as argument. If an array longer, shortens it. If  shorter, loops the array until desired length:
//Generated with Chatgpt:
function adjustArrayLength(number, array) {
  const arrayLength = array.length;
  if (arrayLength === number) {
    return array;
  } else if (arrayLength < number) {
    const numCopies = Math.ceil(number / arrayLength);
    return array.concat(...Array(numCopies).fill(array)).slice(0, number);
  } else {
    return array.slice(0, number);
  }
}

//Finds the closest number within the array that is smaller than the "num" argument:
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

//Set a size of the array and the array will be expanded or shrunk to fix that size. To expand it will just loop the array:
function resizeArray(number, array) {
  var arrayLength = array.length;
  if (arrayLength >= number) {
    return array.slice(0, number);
  }
  var repetitions = Math.ceil(number / arrayLength);
  var expandedArrayLength = repetitions * arrayLength;
  var expandedArray = new Array(expandedArrayLength);
  for (var i = 0; i < expandedArrayLength; i++) {
    expandedArray[i] = array[i % arrayLength];
  }
  return expandedArray.slice(0, number);
}

//Find the most frequent item that appears in an array:
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

function safeSplice(inputArray, amountToRemove,indexToRemove,replaceWith) {
  let array1 = inputArray.slice(0, indexToRemove )
if (replaceWith!=undefined){
array1.push(replaceWith)}
  let array2 = inputArray.slice(indexToRemove + amountToRemove, inputArray.length)
  return array1.concat(array2)
    }


function flipBooleans (arr) {
    return arr.map (a => !a)
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

function removeItem(arr, item){
     return arr.filter(f => f !== item)
    }

function buildArray (n, fillFunction) {
  let outputArray = [];
  for (let i = 0; i < n; i++) {
    outputArray.push(fillFunction(i))
  }
  return outputArray
}

function numArray (start,end) {
    let output = [];
    for(let i = start; i <= end; i++) {output.push(i)};
    return output
}

// modify so that it doesn't have crash potential
function linearArray (start, step, end) {
    let output = [start];
    for (let i = 1; (start + (i*step)) <= end; i++) {
        output.push(start + (i*step))
    }
    return output
}

function geometricArray (start, step, end) {
    let output = [start];
    for (let i = 1; (start * (i*step)) <= end; i++) {
        output.push(start * (i*step))
    }
    return output
}

function scaleToRange (inputArray, inputMin, inputMax, outputMin, outputMax) {
    // add a check to make sure that inputMin and inputMax are not exceeded by values in inputArray?
    let scale = (outputMax - outputMin)/(inputMax - inputMin)
    return inputArray.map(x => ((x - inputMin) * scale) + outputMin)
}

function scaleToSum (span,vals) {
    return vals.map(x => x * span/sum(vals))
}

let pick = inputArray => inputArray[Math.round((inputArray.length - 1) * Math.random())];

let pickN = (n,inputArray) => {
        let a = new Array(n);
        a.fill(0,0,n);
        let out = [];
        a.forEach(i => out.push(pick(inputArray)));
        return out }

function low2HighSort (inputArray) { return inputArray.sort((a, b) => a - b)}

function high2LowSort (inputArray) { return inputArray.sort((a, b) => b - a)}

function takeN (inputArray, n) {
    let outputArray = [];
    for (let i = 0; i < n; i++)
    { outputArray.push(inputArray[i%(inputArray.length)])};
    return outputArray
}

function takeTo (targetLength, inputArray) {
    let output = [];
    let counter = 0;
    while (sum(output) < targetLength){
        let nextVal = inputArray[counter%(inputArray.length)];
        output.push(nextVal);
        counter++
    }
    if (sum(output) > targetLength) {
        outputSum = sum(output);
        let difference = outputSum - targetLength;
        output[output.length - 1] = output[output.length - 1] - difference;
    }
    return output
}

function loopTo (targetLength, inputArray) {
    let inputSum = sum(inputArray);
    let loopN = Math.ceil(targetLength/inputSum);
    let pre = R.flatten(buildArray(loopN, x => inputArray))
    return takeTo(targetLength,pre)
}

function zip (a,b) {return a.map((x, i) => { return [x, b[i]]; })}

function buildZip (a,b) {return a.map((x,i) => x.concat(b[i]))}

function matchesOneOf (candidates, thing) {
    return includesOneOf([thing],candidates)
}

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
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

function gatherBySubstring (inputArray, substringArray) {
    return inputArray.filter(x => substringArray.some(y => x.includes(y)))
}
