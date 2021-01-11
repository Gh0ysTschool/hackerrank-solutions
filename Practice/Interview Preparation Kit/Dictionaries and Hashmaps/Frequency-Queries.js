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

// Complete the freqQuery function below.
function freqQuery(queries) {
  let ans = []
  let h = {}
  let f = {}
  let dec = (num) => num-1
  let d=dec
  let inc = (num) => num+1
  let i=inc
  queries.map( q => {
    if(q[0]==1){
      let tmp = h[q[1]]||0
      h[q[1]] = i(h[q[1]])||1
      if (tmp && f[d(h[q[1]])])
        f[d(h[q[1]])] = d(f[d(h[q[1]])])
      f[h[q[1]]] = i(f[h[q[1]]]||0)
    }
    else if(q[0]==2){
      if(!h[q[1]]) return
      h[q[1]] = d(h[q[1]])||0
      f[i(h[q[1]])] = d(f[i(h[q[1]])])
      f[h[q[1]]] = i(f[h[q[1]]]||0)
    }
    else {
      ans.push((f[q[1]]) ? 1 : 0)
      return
    }
  })
  return ans
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
