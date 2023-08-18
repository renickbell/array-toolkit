// --------------------------------------------------------------------------
// -- arrayToolkit.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Wed Jun 28 10:08:48 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------

let mergedFunctions = {}

Object.assign(mergedFunctions, require('./arrayTransformations.js'))
Object.assign(mergedFunctions, require('./infoFromArray.js'))
Object.assign(mergedFunctions, require('./dataToArray.js'))
const R = require('ramda')
Object.assign(mergedFunctions, R)

module.exports = mergedFunctions
