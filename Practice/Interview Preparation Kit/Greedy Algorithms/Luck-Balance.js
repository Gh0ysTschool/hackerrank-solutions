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

// Complete the luckBalance function below.
function luckBalance(k, contests) {
    let important = [], optional = 0, s, i
    for ( let [x,y] of contests ){
        if (y) important.push(Number(x))
        else optional += x
    }
    if ( k < important.length ){
        s = important.sort((a,b) => (a>b) ? 1 : (a<b) ? -1 : 0)
        console.log(s)
        i = s.length - k
        return optional + s.slice(i).reduce((a,c)=>a+Number(c),0) - s.slice(0,i).reduce((a,c)=>a+Number(c),0)
    }
    return optional + important.reduce((a,c)=>a+Number(c),0)
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    let contests = Array(n);

    for (let i = 0; i < n; i++) {
        contests[i] = readLine().split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
    }

    const result = luckBalance(k, contests);

    ws.write(result + '\n');

    ws.end();
}
