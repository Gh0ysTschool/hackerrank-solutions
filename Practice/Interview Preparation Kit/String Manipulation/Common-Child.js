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

// Complete the commonChild function below.
function commonChild(s1, s2) {
  let hs1tmp = {}, hs2 = {}
  s1.split('').map( (c,i) => { hs1tmp[c] = hs1tmp[c]||[]; hs1tmp[c].push(i); } )
  s2.split('').map( (c,i) => { if(!hs1tmp[c]) return; hs2[c] = hs2[c]||[]; hs2[c].push(i); } )
  let hs1 = {}
  Object.keys(hs1tmp).filter( c => hs2[c] ).map( c => hs1[c] = hs1tmp[c] )

let trail = (key, prevhs1index, prevhs2index, depth) => {
  for (let key1 in hs1)
    for (let index1 in hs1[key1])
      if (hs1[key1][index1] > prevhs1index)
        for (let index2 in hs2[key1])
          if (hs2[key1][index2] > prevhs2index){
            trail(key1,hs1[key1][index1],hs2[key1][index2],depth+1)
            deepestdepth = Math.max(deepestdepth,depth+1)
          }
}

  let deepestdepth = 0
  trail('',-1,-1,0)
  return deepestdepth  

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
