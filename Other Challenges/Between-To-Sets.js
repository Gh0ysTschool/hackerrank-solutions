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

/*
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a, b) {
    a = a.sort( (a,b) => (a>b) ? 1 : (a==b) ? 0 : -1).reverse()
    b = b.sort( (a,b) => (a>b) ? 1 : (a==b) ? 0 : -1)
    let start = a.reduce( (acc,cur) => (acc%cur) ? acc*cur : acc,a[0])
    let end = b[0]
    let check = [start]
    while( start+check[check.length-1] <= end )
      check.push(start+check[check.length-1])
    b.map( v => {
      let filters = []
      check.map( (vv,i) =>{
        if ( v%vv ) filters.push(i)
      })
      check = check.filter ( (vvv,j) => !filters.includes(j) )
    } )
    return check.length

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}
 
