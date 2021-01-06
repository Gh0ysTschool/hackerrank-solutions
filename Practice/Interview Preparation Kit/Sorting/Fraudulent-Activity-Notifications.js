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
  expenditure.slice(0,d).map( l => count[l]++)
  let ex = expenditure.slice(d)
  let notices = 0, mid = Math.floor(d/2), med, jj, num1, num2
  let sort = () => {
    jj = 0
    for ( let j in count ) {
      if ( !count[j] ) continue
      for ( let k = 0; k < count[j]; k++ ){
        jj++
        if ( jj == mid ) num1 = Number(j)
        if ( jj > mid ) {
          num2 = Number(j)
          return
        }
      }
    }
  }
  for ( let i in ex){
    sort()
    med = (1 + (d%2)) * num2 + (1-(d%2)) * num1
    notices += ex[i] >= med
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
