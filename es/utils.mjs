// --------------------------------------------------------------------------
// -- utils.js
// -- license: GPL 3.0
// --------------------------------------------------------------------------

/**
  * Round a number to a specific number of decimal places.
  * @param {number} number - Number to round.
  * @param {number} decimalPlaces - Amount of decimal places to round numbe to.
  * @example console.log(roundTo(10.2332, 2)) //10.23
*/
export function roundTo (number,decimalPlaces){
    let roundedNumber=number.toFixed(decimalPlaces);
    return JSON.parse(roundedNumber)
}

/**
  * Returns a random number between a range.
  * @param {number} min - Minimum amount the random number can be.
  * @param {number} max - Maximum amount the random number can be.
  * @param {number} decimalPlaces - The amount of decimal places the random number can have.
  * @example
  * console.log(randomRange(0, 4, 4)) //1.7395
  * console.log(randomRange(0, 4, 40)) //1.71246107249822
*/
export function randomRange (min, max,decimalPlaces) {
    if (decimalPlaces==undefined){decimalPlaces=0}
      return roundTo(min + (max - min) * (Math.random()),decimalPlaces);
}
