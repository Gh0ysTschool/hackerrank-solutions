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

// Complete the reverseShuffleMerge function below.
function reverseShuffleMerge(s) {
  let cnt = {},k,j,i = {} ,key,c={},sol,next
  s.split('').map( (v,j) => {
    cnt[v] = cnt[v]||0 + 1
    i[v] = [...(i[v]||[]),j]
   } )
  Object.keys(cnt).map( k => cnt[k] = cnt[k]/2 )
  k = Object.keys(cnt).sort()
  sol = ''
  let temp = 0
  while ( sol.length != s.length/2 && temp != 100){
    sol = ''
    Object.keys(cnt).map( k => c[k] = cnt[k] )
    temp++
    for ( let n in k ){
      j = 0
      key = k[n]
      next = i[key].find ( v => v > j )
      if ( c[key]==0 ) continue
      if ( next ) {
        j = next 
        sol += key
        c[key]--
      } else break
    }
  }
  return sol
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = reverseShuffleMerge(s);

    ws.write(result + "\n");

    ws.end();
}
