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

// Complete the hourglassSum function below.
function hourglassSum(arr) {
    let sum = -Infinity
    let ret = 1
    let range = [0,1,2,3]
    if (Array.isArray(arr)){
        range.map( j => {
            if (Array.isArray(arr[j]))
                range.map( i => { 
                    let rg = [[0,0],[0,1],[0,2],[1,1],[2,0],[2,1],[2,2]]
                    let sm = rg.map( ar => (arr[j+ar[0]] && arr[j+ar[0]][i+ar[1]]) ? Number(arr[j+ar[0]][i+ar[1]]) : 0 ).reduce( (acc,cur)=>acc+cur,0)
                    sum = ( sum < sm ) ? sm : sum
                })
        })
    }
    return sum

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        let line = readLine()
        if(!line) line = '0 0 0 0 0 0';
        arr[i] = line.split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
