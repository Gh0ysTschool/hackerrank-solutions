'use strict';

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

let swap = (a,i,j) => {
  a[i] += a[j]
  a[j] = a[i] - a[j]
  a[i] -= a[j]
  return 1
}
function countSwaps(a) {
  let swaps = 0
  for ( let i in a)
    for ( let j in a){
      if (a[j] > a[Number(j)+1])
        swaps+= swap(a,j,Number(j)+1)}

  console.log('Array is sorted in '+swaps+' swaps.')
  console.log('First Element: '+a[0])
  console.log('Last Element: '+a[Math.max(a.length-1,0)])

}

function main() {
    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    countSwaps(a);
}
