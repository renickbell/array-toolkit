// --------------------------------------------------------------------------
// -- array-toolkit-local.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

// let arrayTransformations = require('./arrayTransformations.js')
// let dataToArray = require('./dataToArray.js')
// let infoFromArray = require('./infoFromArray.js')
// 
// module.exports = {
//     arrayTransformations,
//     dataToArray,
//     infoFromArray
// }
// 

const R = require('ramda')
const fs = require('fs');
const path = require('path');

function autoImportModules(...modulePaths) {
  const allFunctions = {};
  modulePaths.forEach((modulePath) => {
    const moduleFullPath = path.resolve(modulePath);
    const module = require(moduleFullPath);
    Object.assign(allFunctions, module);
  });
  return allFunctions;
}

let mergedFunctions = autoImportModules(
  './arrayTransformations.mjs',
  './dataToArray.mjs',
  './infoFromArray.mjs'
);

module.exports = mergedFunctions
