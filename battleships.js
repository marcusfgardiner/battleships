function testBattleShipGrid () {
  let result = grid(2,[0,1,0,1])
  if (result === '.*\n.*') {
    console.log('Test passed')
  } else {
    console.log('Test failed')
  }
}

testBattleShipGrid();

// function substitute (array) {
//   var arrayLength = array.length;
//   for (var i = 0; i < arrayLength; i++) {
//     if (array[i] === 0) {
//       console.log('.')
//     }
//     else {
//       console.log('*')
//     }
//   }
// };
//
// function newLine (n, array) {
//       console.log('\n')
// }

function grid (n, array) {
  var string = ''
  var arrayLength = array.length;
  for (var i = 0; i < arrayLength; i++) {
    if (array[i] === 0) {
      string += '.';
    }
    else if (array[i] === 1) {
      string += '*'
    }
    if ((i+1) % n === 0 && i !== (arrayLength - 1) ) {
      string += '\n'
    }
  }
  return string
};
