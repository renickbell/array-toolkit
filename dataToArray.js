// --------------------------------------------------------------------------
// -- dataToArray.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//Takes a function and make the outputs from it an array, the function can use the current index as an argument.
function buildArray (n, fillFunction) {
  let outputArray = [];
  for (let i = 0; i < n; i++) {
    outputArray.push(fillFunction(i))
  }
  return outputArray
}

// modify so that it doesn't have crash potential
function linearArray (start, step, end) {
    let output = [start];
    for (let i = 1; (start + (i*step)) <= end; i++) {
        output.push(start + (i*step))
    }
    return output
}

//Makes an array filled with integers, the starting and anding value can be specified.
function integerArray (start,end) {
    return linearArray(start, 1, end)
}

//makes an array of numbers, you can specify the gap between each number
function geometricArray (start, step, end) {
    let output = [start];
    for (let i = 1; (start * (i*step)) <= end; i++) {
        output.push(start * (i*step))
    }
    return output
}

