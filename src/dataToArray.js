// --------------------------------------------------------------------------
// -- dataToArray.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

/**
  * Takes a function and make the outputs from it an array, the function can use the current index as an argument.
  * @param {number} n - the desired length of the output array
  * @param {function} fillFunction - the function to process the current index of array with
  * @example console.log(buildArray(10, i => i * 10)) //[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
*/
function buildArray(n, fillFunction) {
    return Array.from({ length: n }, (_, i) => fillFunction(i));
}

/**
  * Linear array returns a number array where all the numbers are increasing orer. Start is the starting point and the first number. Step is thte difference between each number and numberOfSteps is the length of the array returned.
  * @param {number} start - the start value of the array of numbers
  * @param {number} step - the steps between each number
  * @param {number} numberOfSteps - the length of the output array
  * @example console.log(linearArray(0,2,10)) //[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
*/
function linearArray(start, step, numberOfSteps) {
    let output = this.buildArray(numberOfSteps, (i) => start + i * step);
    return output; 
}

/**
  * Makes an array filled with integers, the starting and the length of output array can be specified.
  * @param {number} start - the start value of the array of numbers
  * @param {number} numberOfSteps - the length of the output array
  * @example console.log(integerArray(3, 30)) //[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
*/
function integerArray(start, numberOfSteps) {
    return this.linearArray(start, 1, numberOfSteps);
}

/**
  * makes an array of numbers, you can specify the gap between each number
  * @param {number} start - the start value of the array of numbers
  * @param {number} step - the steps between each number
  * @param {number} numberOfSteps - the length of the array
  * @example console.log(geometricArray(1, 2 ,10)) //[1, 2, 4, 6, 8, 10, 12, 14, 16, 18]
*/
function geometricArray(start, step, numberOfSteps) {
    let output = this.buildArray(numberOfSteps, (i) => i * step);
    output[0] = start;
    return output;
}

module.exports = {
    buildArray,
    linearArray,
    integerArray,
    geometricArray,
};
