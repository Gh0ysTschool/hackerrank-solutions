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
  let count = Array(201).fill(0)
  let tmp = expenditure.slice(0,d)
  tmp.map( l => count[l]++ )
  let ex = expenditure.slice(d)
  let notices = 0, l, med
  for ( let i in ex){
    let jj = 0
    for ( let j in count ) {
      if ( jj > tmp.length/2 ) break
      if ( count[j] ) 
        for ( let k = 0; k < count[j]; k++ ){
          tmp[jj] = j
          jj++
        }
    }
    l = Math.floor(d/2)
    med = (d%2) ? tmp[l] : (tmp[l-1] + tmp[l])/2
    notices += ex[i] >= 2*med
    count[expenditure[i]]--
    count[ex[i]]++
  }
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
