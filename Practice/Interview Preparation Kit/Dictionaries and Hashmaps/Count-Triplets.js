'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {
  let h = {}
  let p = {}
  let triplets = 0
  arr.map ( (a,i) => h[a] = h[a]+1 || 1 )
  arr.map( (a,i) => {
    h[a]--
    triplets += !(a%r) * (p[a/r]||0) * (h[a*r]||0)
    p[a] = p[a]+1||1
  })
  return triplets
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
