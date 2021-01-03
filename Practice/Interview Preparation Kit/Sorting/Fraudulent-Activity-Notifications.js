'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
  let countingSort = (a,range) => {
    let l = Array(range+1).fill(0)
    let ans = []
    for ( let v of a ){
      l[v]++
    }
    for ( let i = 1; i < l.length; i++ ) {
      l[i] += l[i-1]
    }
    let indx
    for( let i = a.length-1; i >= 0; i-- ){
      l[a[i]]--
      indx = l[a[i]]
      ans[indx] = a[i]
    }
    return ans
  }
  let median = (a) => {
    let arr = countingSort(a,200)//a.sort((a,b) => (a>b) ? 1 : (a<b) ? -1 : 0)
    let l = Math.floor(arr.length/2)
    return (arr.length%2) ? arr[l] : (arr[l-1] + arr[l])/2
  }
  let notices = 0
  expenditure.map( (e,i) => {
    if (i >= d)
      if ( e >= 2*median(expenditure.slice(i-d,i)))
        notices++
  })
  return notices
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);

    ws.write(result + "\n");

    ws.end();
}
