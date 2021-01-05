'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}
function mergeSort(arr) {
  if (arr.length <= 1) return 0
  let mid = Math.floor(arr.length/2)
  let L = arr.slice(0,mid)
  let R = arr.slice(mid)
  let inverts = mergeSort(L)
  inverts += mergeSort(R)
  let i = 0,j = 0,k = 0
  while (i < L.length && j < R.length){
      if (L[i] <= R[j]) {
          arr[k] = L[i]
          i += 1
      }
      else {
          arr[k] = R[j]
          j += 1
          inverts += (mid-i)
      }
      k += 1
  }
  while (i < L.length){
      arr[k] = L[i]
      i += 1
      k += 1
  }
  while (j < R.length) {
      arr[k] = R[j]
      j += 1
      k += 1
  }
  return inverts
}
// Complete the countInversions function below.
function countInversions(arr) {
  return mergeSort(arr)
  
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = countInversions(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
