// --------------------------------------------------------------------------
// -- arrayTransformations.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//Takes the length the array should be changed into as argument. If array longer, will shorten array. If array shorter will loop the array until desiredLength:
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

function safeSplice(inputArray, amountToRemove,indexToRemove,replaceWith) {
  let array1 = inputArray.slice(0, indexToRemove )
if (replaceWith!=undefined){
array1.push(replaceWith)}
  let array2 = inputArray.slice(indexToRemove + amountToRemove, inputArray.length)
  return array1.concat(array2)
}

function removeItem(arr, item){
     return arr.filter(f => f !== item)
}

function removeMultipleItems (arr, itemsToRemove){
    let sortedArray = arr
    itemsToRemove.forEach(x => {
        sortedArray = removeItem(sortedArray, x)
    })
    return sortedArray
}

function scaleToRange (inputArray, inputMin, inputMax, outputMin, outputMax) {
    // add a check to make sure that inputMin and inputMax are not exceeded by values in inputArray?
    let scale = (outputMax - outputMin)/(inputMax - inputMin)
    return inputArray.map(x => ((x - inputMin) * scale) + outputMin)
}

function scaleToSum (span,vals) {
    return vals.map(x => x * span/sum(vals))
}

function pick (inputArray) {
    return inputArray[Math.round((inputArray.length - 1) * Math.random())];
}

function pickN (n,inputArray) {
        let a = new Array(n);
        a.fill(0,0,n);
        let out = [];
        a.forEach(i => out.push(pick(inputArray)));
        return out 
}

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

//Non ramda version:
// function zip (a,b) {return a.map((x, i) => { return [x, b[i]]; })}

//randa version:
function zip (a,b) {return R.zip(a,b)}

// a is an array of arrays; this function concats b onto each of the arrays in a. b could be either an item or an array.
// arr1 = [[1,1,1],[2,2,2],[3,3,3]] 
// arr2 = [[4,4,4],[5,5,5],[6,6,6]] 
// buildZip(arr1,arr2)
// non ramda version:
// function buildZip (a,b) {return a.map((x,i) => x.concat(b[i]))}
//ramda version:
function buildZip(a, b) {
  return R.zipWith(R.concat, a, b);
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

function gatherBySubstring (inputArray, substringArray) {
    return inputArray.filter(x => substringArray.some(y => x.includes(y)))
}

function flipBooleans (arr) {
    return arr.map (a => !a)
}
