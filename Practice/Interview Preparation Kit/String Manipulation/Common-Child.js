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
    let n = s1.length, m = s2.length
    let lcs = Array(n+1).fill(0).map( l => Array(m+1).fill(0) )
    for ( let i in lcs[0] )
        for ( let j in lcs )
            if (i==0 || j==0)
              lcs[i][j] = 0
            else if (s1[i-1] == s2[j-1])
                lcs[i][j] = lcs[i-1][j-1] + 1
            else
                lcs[i][j] = Math.max(lcs[i][j-1],lcs[i-1][j])

    return lcs[n][m]

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
