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

// Complete the isValid function below.
function isValid(s) {
  let h = {}, hi = {}
  s.split('').map( c => h[c] = (h[c]||0)+1 )
  Object.keys(h).map( k => hi[h[k]] = (hi[h[k]]||0)+1 )
  let hii = Object.values(hi)
  let hik = Object.keys(hi)
  return (hii.length > 2) ? 'NO' : (hii.length == 1) ? 'YES' : (Math.abs(hik[0] - hik[1]) && ( hii[0] == 1 || hii[1] == 1) ) ? 'YES' : 'NO'

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
