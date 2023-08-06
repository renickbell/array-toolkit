// --------------------------------------------------------------------------
// -- dataToArray.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

//Takes a function and make the outputs from it an array, the function can use the current index as an argument.
function buildArray(n, fillFunction) {
    return Array.from({ length: n }, (_, i) => fillFunction(i));
}

// modify so that it doesn't have crash potential
//Linear array returns a number array where all the numbers are increasing orer. Start is the starting point and the first number. Step is thte difference between each number and numberOfSteps is the length of the array returned.
function linearArray(start, step, numberOfSteps) {
    let output = this.buildArray(numberOfSteps, (i) => start + i * step);
    return output;
}

//Makes an array filled with integers, the starting and anding value can be specified.
function integerArray(start, end) {
    return this.linearArray(start, 1, end);
}

//makes an array of numbers, you can specify the gap between each number
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
