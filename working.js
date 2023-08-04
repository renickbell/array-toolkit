

function buildArray(n, fillFunction) {
  return Array.from({ length: n }, (_, i) => fillFunction(i));
}

buildArray(10, i => i)

function pick (inputArray) {
    return inputArray[Math.round((inputArray.length - 1) * Math.random())];
}

function pickN (n,inputArray) {
    return buildArray(n, i => pick(inputArray)) 
}

let inArr = ["hi","steve",'yiler']
pickN(10,inArr)

function shuffle(array) {
  return array.reduceRight((acc, _, currentIndex) => {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [acc[currentIndex], acc[randomIndex]] = [acc[randomIndex], acc[currentIndex]];
    return acc;
  }, [...array]);
}

shuffle(inArr)

function linearArray (start, step, end) {
    let output = buildArray(Math.floor((end - start)/step) + 1, i => start + i * step)
    return output
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

removeItem(inArr,"hi")

function geometricArray (start, step, end) {
    let output = buildArray(Math.floor(end/(start * step)) + 1, i =>  i * step)
    output[0] = start;
    return output
}

geometricArray(1,3,9)
geometricArray(3,3,9)

function takeN (inputArray, n) {
    let outputArray = [];
    for (let i = 0; i < n; i++)
    { outputArray.push(inputArray[i%(inputArray.length)])};
    return outputArray
}

function linearArray (start, step, numberOfSteps) {
    let output = buildArray(numberOfSteps, i => start + i * step)
    return output
}

linearArray(0,1,10)
linearArray(10,2,10)
linearArray(10,5,2)
linearArray(0,100,2)


