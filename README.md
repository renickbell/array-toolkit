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
src contains all the files needed for using the code with require and es contains all the files needed for using the code with await import. All those directories contain the same things except one is in .Js and the other is in .mjs.

## Documentation
### arrayTransformations
### dataToArray
### infoFromArrqy
### R
R is where the the [Ramda](https://www.npmjs.com/package/ramda) package is stored so that array-toolkit can use it.
## Development

### Test

```
npm run test
```
