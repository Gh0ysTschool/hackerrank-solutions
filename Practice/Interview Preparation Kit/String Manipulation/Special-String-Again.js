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
function trail(arr,i,char,dir,offset) {
  return (arr[i+dir] == char) ? offset%2 + trail(arr,i+dir,char,dir,offset+dir): 0
}
function flipible(i,offset,arr,char) {
  if (!char || (!arr[i+offset] && !arr[i-offset])) return 0
  return (arr[i+offset] == char && arr[i-offset] == char) ? 1 + flipible(i,offset+1,arr,char) : 0
}
function substrCount(n, s) {
  let ss = s.split('')
  return n + ss.reduce( (acc,c,i) => acc + flipible(i,1,ss,ss[i+1]) + trail(ss,i,c,1,1), 0 )
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
